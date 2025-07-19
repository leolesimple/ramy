'use client';

import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

export default function MenuPage() {
    return (
        <motion.div
            className="flex flex-col h-full items-center justify-center font-sans antialiased px-4 text-center space-y-2 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <motion.h2
                className="text-4xl font-bold max-w-md"
                initial={{opacity: 0, y: 10}}
                animate={{opacity: 1, y: 0}}
                transition={{duration: 0.6, ease: 'easeOut'}}
                viewport={{ once: true }}
            >
                RAMY
            </motion.h2>

            <motion.h3
                className="text-2xl font-light max-w-xs"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
            >
                Choisissez une action à effectuer :
            </motion.h3>

            <motion.div
                className="flex gap-4 w-full max-w-fit mx-auto"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
            >
                <Button href="/lignes">Ajout</Button>
                <Button href="/vision">Vision</Button>
            </motion.div>
        </motion.div>
    );
}
