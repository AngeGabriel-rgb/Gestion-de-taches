"use client"

import { SelectItem } from "@/components/ui/select"

import { SelectContent } from "@/components/ui/select"

import { SelectValue } from "@/components/ui/select"

import { SelectTrigger } from "@/components/ui/select"

import { Select } from "@/components/ui/select"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { toast } from "@/components/ui/use-toast"
import { motion } from "framer-motion"

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = () => {
    setIsLoading(true)

    // Simuler une sauvegarde
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Paramètres sauvegardés",
        description: "Les paramètres ont été mis à jour avec succès.",
      })
    }, 1000)
  }

  return (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Paramètres</h1>
        <p className="text-muted-foreground">Gérez les paramètres de votre application.</p>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="appearance">Apparence</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Paramètres généraux</CardTitle>
              <CardDescription>Configurez les paramètres généraux de votre application.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="app-name">Nom de l'application</Label>
                <Input id="app-name" defaultValue="TaskMaster" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="app-description">Description</Label>
                <Textarea id="app-description" defaultValue="Application de gestion de tâches personnelles" rows={3} />
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Options avancées</h3>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="maintenance-mode">Mode maintenance</Label>
                    <p className="text-sm text-muted-foreground">
                      Activer le mode maintenance pour empêcher l'accès aux utilisateurs.
                    </p>
                  </div>
                  <Switch id="maintenance-mode" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="user-registration">Inscription utilisateur</Label>
                    <p className="text-sm text-muted-foreground">Autoriser les nouveaux utilisateurs à s'inscrire.</p>
                  </div>
                  <Switch id="user-registration" defaultChecked />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Sauvegarde en cours..." : "Sauvegarder les modifications"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Apparence</CardTitle>
              <CardDescription>Personnalisez l'apparence de votre application.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Thème</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col items-center gap-2">
                    <div className="border rounded-md p-2 cursor-pointer hover:border-primary">
                      <div className="w-full h-24 bg-white rounded-md border"></div>
                    </div>
                    <span className="text-sm">Clair</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="border rounded-md p-2 cursor-pointer hover:border-primary">
                      <div className="w-full h-24 bg-gray-900 rounded-md border"></div>
                    </div>
                    <span className="text-sm">Sombre</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="border rounded-md p-2 cursor-pointer hover:border-primary">
                      <div className="w-full h-24 bg-gradient-to-b from-white to-gray-900 rounded-md border"></div>
                    </div>
                    <span className="text-sm">Système</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Couleur principale</Label>
                <div className="grid grid-cols-6 gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#9B1B1B] cursor-pointer border-2 border-[#9B1B1B]"></div>
                  <div className="w-10 h-10 rounded-full bg-blue-600 cursor-pointer"></div>
                  <div className="w-10 h-10 rounded-full bg-green-600 cursor-pointer"></div>
                  <div className="w-10 h-10 rounded-full bg-purple-600 cursor-pointer"></div>
                  <div className="w-10 h-10 rounded-full bg-orange-500 cursor-pointer"></div>
                  <div className="w-10 h-10 rounded-full bg-gray-600 cursor-pointer"></div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="custom-css">CSS personnalisé</Label>
                <Textarea id="custom-css" placeholder=".custom-class { color: #9B1B1B; }" rows={5} />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Sauvegarde en cours..." : "Sauvegarder les modifications"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Configurez les paramètres de notification.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notifications par email</h3>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-new-user">Nouvel utilisateur</Label>
                    <p className="text-sm text-muted-foreground">
                      Recevoir une notification lorsqu'un nouvel utilisateur s'inscrit.
                    </p>
                  </div>
                  <Switch id="email-new-user" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-task-created">Tâche créée</Label>
                    <p className="text-sm text-muted-foreground">
                      Recevoir une notification lorsqu'une nouvelle tâche est créée.
                    </p>
                  </div>
                  <Switch id="email-task-created" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-reports">Rapports hebdomadaires</Label>
                    <p className="text-sm text-muted-foreground">
                      Recevoir un rapport hebdomadaire sur l'activité de l'application.
                    </p>
                  </div>
                  <Switch id="email-reports" defaultChecked />
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Notifications système</h3>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="system-errors">Erreurs système</Label>
                    <p className="text-sm text-muted-foreground">Recevoir une notification en cas d'erreur système.</p>
                  </div>
                  <Switch id="system-errors" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="system-updates">Mises à jour</Label>
                    <p className="text-sm text-muted-foreground">
                      Recevoir une notification lorsqu'une mise à jour est disponible.
                    </p>
                  </div>
                  <Switch id="system-updates" defaultChecked />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email-from">Email expéditeur</Label>
                <Input id="email-from" defaultValue="noreply@taskmaster.com" />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Sauvegarde en cours..." : "Sauvegarder les modifications"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Sécurité</CardTitle>
              <CardDescription>Configurez les paramètres de sécurité de votre application.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="password-policy">Politique de mot de passe</Label>
                <Select defaultValue="strong">
                  <SelectTrigger id="password-policy">
                    <SelectValue placeholder="Sélectionner une politique" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="basic">Basique (min. 6 caractères)</SelectItem>
                    <SelectItem value="medium">Moyenne (min. 8 caractères, 1 chiffre)</SelectItem>
                    <SelectItem value="strong">Forte (min. 10 caractères, majuscules, chiffres, symboles)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="session-timeout">Expiration de session</Label>
                <Select defaultValue="24h">
                  <SelectTrigger id="session-timeout">
                    <SelectValue placeholder="Sélectionner une durée" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1h">1 heure</SelectItem>
                    <SelectItem value="8h">8 heures</SelectItem>
                    <SelectItem value="24h">24 heures</SelectItem>
                    <SelectItem value="7d">7 jours</SelectItem>
                    <SelectItem value="30d">30 jours</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Options de sécurité</h3>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="two-factor">Authentification à deux facteurs</Label>
                    <p className="text-sm text-muted-foreground">
                      Exiger l'authentification à deux facteurs pour tous les utilisateurs.
                    </p>
                  </div>
                  <Switch id="two-factor" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="ip-restriction">Restriction d'IP</Label>
                    <p className="text-sm text-muted-foreground">Limiter l'accès à certaines adresses IP.</p>
                  </div>
                  <Switch id="ip-restriction" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="login-attempts">Limite de tentatives de connexion</Label>
                    <p className="text-sm text-muted-foreground">
                      Bloquer les comptes après plusieurs tentatives de connexion échouées.
                    </p>
                  </div>
                  <Switch id="login-attempts" defaultChecked />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="allowed-ips">Adresses IP autorisées</Label>
                <Textarea id="allowed-ips" placeholder="192.168.1.1, 10.0.0.1" rows={3} />
                <p className="text-sm text-muted-foreground">
                  Laissez vide pour autoriser toutes les adresses IP. Séparez les adresses par des virgules.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSave} disabled={isLoading}>
                {isLoading ? "Sauvegarde en cours..." : "Sauvegarder les modifications"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
