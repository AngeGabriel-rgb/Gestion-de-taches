"use client";

import Link from "next/link";
import { ListTodo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header 
      className={`sticky top-0 z-50 border-b ${
        isScrolled ? "bg-background/95 backdrop-blur-sm" : "bg-background"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container flex h-16 items-center justify-between py-4">
        <motion.div 
          className="flex items-center gap-2 font-bold text-xl"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <ListTodo className="h-6 w-6 text-primary" />
          <span>FocusMate</span>
        </motion.div>
        <nav className="flex gap-4 sm:gap-6">
          <Link href="/login">
            <Button variant="ghost" className="text-sm font-medium">
              Connexion
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="default" className="text-sm font-medium">
              Inscription
            </Button>
          </Link>
        </nav>
      </div>
    </motion.header>
  );
}