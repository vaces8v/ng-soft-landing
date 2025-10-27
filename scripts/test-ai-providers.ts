#!/usr/bin/env tsx

/**
 * Скрипт для тестирования AI провайдеров
 * Проверяет работоспособность OpenRouter и Groq API
 * 
 * Использование:
 *   npm run test-ai
 *   или
 *   tsx scripts/test-ai-providers.ts
 */

import 'dotenv/config';

interface TestResult {
  provider: string;
  success: boolean;
  latency?: number;
  error?: string;
  responsePreview?: string;
}

async function testOpenRouter(): Promise<TestResult> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  
  if (!apiKey) {
    return {
      provider: 'OpenRouter',
      success: false,
      error: 'OPENROUTER_API_KEY not found in .env',
    };
  }

  const startTime = Date.now();

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        'X-Title': 'NG-Soft AI Test',
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.3-70b-instruct',
        messages: [
          { role: 'system', content: 'Ты помощник. Отвечай кратко.' },
          { role: 'user', content: 'Привет! Ответь одним словом: работаешь?' },
        ],
        temperature: 0.3,
        max_tokens: 50,
      }),
    });

    const latency = Date.now() - startTime;

    if (!response.ok) {
      const error = await response.text();
      return {
        provider: 'OpenRouter',
        success: false,
        latency,
        error: `HTTP ${response.status}: ${error.substring(0, 200)}`,
      };
    }

    const data = await response.json();
    const responseText = data.choices[0]?.message?.content || 'No response';

    return {
      provider: 'OpenRouter',
      success: true,
      latency,
      responsePreview: responseText.substring(0, 100),
    };
  } catch (error) {
    return {
      provider: 'OpenRouter',
      success: false,
      latency: Date.now() - startTime,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

async function testGroq(): Promise<TestResult> {
  const apiKey = process.env.GROQ_API_KEY;
  
  if (!apiKey) {
    return {
      provider: 'Groq',
      success: false,
      error: 'GROQ_API_KEY not found in .env',
    };
  }

  const startTime = Date.now();

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          { role: 'system', content: 'Ты помощник. Отвечай кратко.' },
          { role: 'user', content: 'Привет! Ответь одним словом: работаешь?' },
        ],
        temperature: 0.3,
        max_tokens: 50,
      }),
    });

    const latency = Date.now() - startTime;

    if (!response.ok) {
      const error = await response.text();
      return {
        provider: 'Groq',
        success: false,
        latency,
        error: `HTTP ${response.status}: ${error.substring(0, 200)}`,
      };
    }

    const data = await response.json();
    const responseText = data.choices[0]?.message?.content || 'No response';

    return {
      provider: 'Groq',
      success: true,
      latency,
      responsePreview: responseText.substring(0, 100),
    };
  } catch (error) {
    return {
      provider: 'Groq',
      success: false,
      latency: Date.now() - startTime,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

function formatResult(result: TestResult): string {
  const icon = result.success ? '✅' : '❌';
  const status = result.success ? 'SUCCESS' : 'FAILED';
  
  let output = `\n${icon} ${result.provider}: ${status}`;
  
  if (result.latency) {
    output += `\n   Latency: ${result.latency}ms`;
  }
  
  if (result.success && result.responsePreview) {
    output += `\n   Response: "${result.responsePreview}"`;
  }
  
  if (!result.success && result.error) {
    output += `\n   Error: ${result.error}`;
  }
  
  return output;
}

async function main() {
  console.log('🔍 Testing AI Providers...\n');
  console.log('=' .repeat(60));
  
  const hasOpenRouter = !!process.env.OPENROUTER_API_KEY;
  const hasGroq = !!process.env.GROQ_API_KEY;
  
  console.log('📋 Configuration:');
  console.log(`   OpenRouter API Key: ${hasOpenRouter ? '✅ Found' : '❌ Missing'}`);
  console.log(`   Groq API Key:       ${hasGroq ? '✅ Found' : '❌ Missing'}`);
  console.log('=' .repeat(60));
  
  const results: TestResult[] = [];
  
  if (hasOpenRouter) {
    console.log('\n🧪 Testing OpenRouter...');
    const result = await testOpenRouter();
    results.push(result);
    console.log(formatResult(result));
  }
  
  if (hasGroq) {
    console.log('\n🧪 Testing Groq...');
    const result = await testGroq();
    results.push(result);
    console.log(formatResult(result));
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('📊 Summary:');
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`   Total providers tested: ${results.length}`);
  console.log(`   ✅ Successful: ${successful.length}`);
  console.log(`   ❌ Failed: ${failed.length}`);
  
  if (successful.length > 0) {
    const avgLatency = successful.reduce((sum, r) => sum + (r.latency || 0), 0) / successful.length;
    console.log(`   ⚡ Average latency: ${Math.round(avgLatency)}ms`);
  }
  
  console.log('=' .repeat(60));
  
  // Рекомендации
  if (successful.length === 0) {
    console.log('\n⚠️  ВНИМАНИЕ: Ни один провайдер не работает!');
    console.log('\n💡 Рекомендации:');
    console.log('   1. Проверьте API ключи в .env файле');
    console.log('   2. Убедитесь, что ключи валидны');
    console.log('   3. Для OpenRouter: https://openrouter.ai/keys');
    console.log('   4. Для Groq: https://console.groq.com/keys');
    console.log('   5. Если в РФ: используйте OpenRouter (работает без VPN)\n');
  } else {
    console.log('\n✅ Все готово! Ваш AI-ассистент готов к работе.');
    
    if (hasOpenRouter && successful.some(r => r.provider === 'OpenRouter')) {
      console.log('   🌍 OpenRouter работает - подходит для РФ!');
    }
    
    if (hasGroq && failed.some(r => r.provider === 'Groq')) {
      console.log('   ⚠️  Groq не работает (возможно, нужен VPN в РФ)');
    }
    
    console.log('\n   Запустите проект: npm run dev\n');
  }
}

main().catch(console.error);
