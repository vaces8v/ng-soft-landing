'use client'

import { Icon } from "@iconify/react"
import { FC } from "react"
import { motion } from "framer-motion"


export const BackToTop: FC = () => {
    return (
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 300 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow z-50"
          aria-label="Вернуться наверх"
        >
          <Icon icon="lucide:arrow-up" className="h-5 w-5" />
        </motion.button>
    )
}