'use client';

import React, { useState } from 'react';
import { 
  useGetAuthUserQuery, 
  useUpdateUserProfileMutation,
  useUpdateParticulierProfileMutation,
  useUpdateNotificationsMutation 
} from '@/state/api';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { FormField } from '@/components/ui/form-field';
import {
  User,
  Building2,
  Bell,
  Shield,
  CreditCard,
  Globe,
  Phone,
  Mail,
  Camera,
  Save,
  Upload,
} from 'lucide-react';
import type { AccountTier } from '@/types/prismaTypes';

const SettingsPage = () => {
  const { data, isLoading } = useGetAuthUserQuery();
  const [updateProfile] = useUpdateUserProfileMutation();
  const [updateParticulier] = useUpdateParticulierProfileMutation();
  const [updateNotifications] = useUpdateNotificationsMutation();
  
  const [activeTab, setActiveTab] = useState('profile');
  const [isSaving, setIsSaving] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingCompany, setIsEditingCompany] = useState(false);

  // Form states - initialized with empty values, will be updated in useEffect
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    avatar: '',
  });

  const [companyData, setCompanyData] = useState({
    companyName: '',
    companyDescription: '',
    commerceRegister: '',
    taxId: '',
  });

  const [contactPrefs, setContactPrefs] = useState({
    showPhone: true,
    showWhatsApp: false,
    whatsappNumber: '',
  });

  const [notificationPrefs, setNotificationPrefs] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
  });

  // Initialize form data when user data is loaded
  React.useEffect(() => {
    if (data?.userInfo) {
      setProfileData({
        firstName: data.userInfo.firstName || '',
        lastName: data.userInfo.lastName || '',
        phone: data.userInfo.phone || '',
        avatar: data.userInfo.avatar || '',
      });

      setCompanyData({
        companyName: data.userInfo.companyName || '',
        companyDescription: data.userInfo.companyDescription || '',
        commerceRegister: data.userInfo.commerceRegister || '',
        taxId: data.userInfo.taxId || '',
      });

      setContactPrefs({
        showPhone: data.userInfo.showPhone ?? true,
        showWhatsApp: data.userInfo.showWhatsApp ?? false,
        whatsappNumber: data.userInfo.whatsappNumber || '',
      });

      setNotificationPrefs({
        emailNotifications: data.userInfo.emailNotifications ?? true,
        smsNotifications: data.userInfo.smsNotifications ?? false,
        pushNotifications: data.userInfo.pushNotifications ?? true,
      });
    }
  }, [data]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600" />
      </div>
    );
  }

  const userInfo = data?.userInfo;
  const accountTier = userInfo?.accountTier as AccountTier;
  const isPro = accountTier !== 'FREE';

  const tierConfig = {
    FREE: { label: 'Particulier', color: 'bg-gray-500' },
    STARTER: { label: 'Pro Starter', color: 'bg-blue-500' },
    PRO: { label: 'Pro', color: 'bg-purple-500' },
    ELITE: { label: 'Elite', color: 'bg-amber-500' },
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const cognitoId = userInfo?.cognitoId;
      if (!cognitoId) throw new Error('No user ID');

      // Validation
      if (!profileData.firstName.trim()) {
        alert('Le prénom est requis');
        setIsSaving(false);
        return;
      }
      if (!profileData.lastName.trim()) {
        alert('Le nom est requis');
        setIsSaving(false);
        return;
      }

      if (isPro) {
        await updateProfile({ 
          cognitoId, 
          data: {
            firstName: profileData.firstName.trim(),
            lastName: profileData.lastName.trim(),
            phone: profileData.phone.trim(),
            avatar: profileData.avatar,
          }
        }).unwrap();
      } else {
        await updateParticulier({ 
          cognitoId, 
          data: {
            firstName: profileData.firstName.trim(),
            lastName: profileData.lastName.trim(),
            phone: profileData.phone.trim(),
            avatar: profileData.avatar,
          }
        }).unwrap();
      }
      
      setIsEditingProfile(false);
      alert('Profil mis à jour avec succès !');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Erreur lors de la sauvegarde du profil');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveCompany = async () => {
    setIsSaving(true);
    try {
      const cognitoId = userInfo?.cognitoId;
      if (!cognitoId) throw new Error('No user ID');

      // Validation
      if (!companyData.companyName.trim()) {
        alert('Le nom de l\'entreprise est requis');
        setIsSaving(false);
        return;
      }

      await updateProfile({ 
        cognitoId, 
        data: {
          companyName: companyData.companyName.trim(),
          companyDescription: companyData.companyDescription.trim(),
          commerceRegister: companyData.commerceRegister.trim(),
          taxId: companyData.taxId.trim(),
        }
      }).unwrap();
      
      setIsEditingCompany(false);
      alert('Informations entreprise mises à jour avec succès !');
    } catch (error) {
      console.error('Error saving company info:', error);
      alert('Erreur lors de la sauvegarde');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveNotifications = async () => {
    setIsSaving(true);
    try {
      const cognitoId = userInfo?.cognitoId;
      if (!cognitoId) throw new Error('No user ID');

      await updateNotifications({ 
        cognitoId,
        emailNotifications: notificationPrefs.emailNotifications,
        smsNotifications: notificationPrefs.smsNotifications,
        pushNotifications: notificationPrefs.pushNotifications,
      }).unwrap();
      
      alert('Préférences de notification mises à jour avec succès !');
    } catch (error) {
      console.error('Error saving notifications:', error);
      alert('Erreur lors de la sauvegarde');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveContact = async () => {
    setIsSaving(true);
    try {
      const cognitoId = userInfo?.cognitoId;
      if (!cognitoId) throw new Error('No user ID');

      if (isPro) {
        await updateProfile({ 
          cognitoId, 
          data: {
            showPhone: contactPrefs.showPhone,
            showWhatsApp: contactPrefs.showWhatsApp,
            whatsappNumber: contactPrefs.whatsappNumber,
          }
        }).unwrap();
      } else {
        await updateParticulier({ 
          cognitoId, 
          data: {
            showPhone: contactPrefs.showPhone,
            showWhatsApp: contactPrefs.showWhatsApp,
            whatsappNumber: contactPrefs.whatsappNumber,
          }
        }).unwrap();
      }
      
      alert('Préférences de contact mises à jour avec succès !');
    } catch (error) {
      console.error('Error saving contact preferences:', error);
      alert('Erreur lors de la sauvegarde');
    } finally {
      setIsSaving(false);
    }
  };

  const getInitials = () => {
    const first = profileData.firstName?.charAt(0) || userInfo?.firstName?.charAt(0) || '';
    const last = profileData.lastName?.charAt(0) || userInfo?.lastName?.charAt(0) || '';
    return (first + last).toUpperCase() || userInfo?.email?.charAt(0).toUpperCase() || 'U';
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Paramètres</h1>
            <p className="text-gray-600 mt-1 text-sm md:text-base">
              Gérez votre profil et vos préférences
            </p>
          </div>
          <Badge className={`${tierConfig[accountTier]?.color} text-white border-0 px-4 py-2 rounded-lg w-fit`}>
            {tierConfig[accountTier]?.label}
          </Badge>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5 mb-6 md:mb-8 bg-white border-2 border-gray-200 rounded-lg p-1 gap-1">
          <TabsTrigger
            value="profile"
            className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white rounded-lg text-xs md:text-sm"
          >
            <User className="w-4 h-4 mr-1 md:mr-2" />
            <span className="hidden sm:inline">Profil</span>
          </TabsTrigger>
          {isPro && (
            <TabsTrigger
              value="company"
              className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white rounded-lg text-xs md:text-sm"
            >
              <Building2 className="w-4 h-4 mr-1 md:mr-2" />
              <span className="hidden sm:inline">Entreprise</span>
            </TabsTrigger>
          )}
          <TabsTrigger
            value="contact"
            className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white rounded-lg text-xs md:text-sm"
          >
            <Phone className="w-4 h-4 mr-1 md:mr-2" />
            <span className="hidden sm:inline">Contact</span>
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white rounded-lg text-xs md:text-sm"
          >
            <Bell className="w-4 h-4 mr-1 md:mr-2" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white rounded-lg text-xs md:text-sm"
          >
            <Shield className="w-4 h-4 mr-1 md:mr-2" />
            <span className="hidden sm:inline">Sécurité</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="p-4 md:p-6 bg-white border-0 shadow-md">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                Informations personnelles
              </h2>
              {!isEditingProfile ? (
                <Button
                  variant="outline"
                  onClick={() => setIsEditingProfile(true)}
                  className="rounded-lg border-2"
                >
                  <User className="w-4 h-4 mr-2" />
                  Modifier
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setIsEditingProfile(false);
                      // Reset to original data from database
                      if (userInfo) {
                        setProfileData({
                          firstName: userInfo.firstName || '',
                          lastName: userInfo.lastName || '',
                          phone: userInfo.phone || '',
                          avatar: userInfo.avatar || '',
                        });
                      }
                    }}
                    className="rounded-lg"
                  >
                    Annuler
                  </Button>
                  <Button
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg px-4"
                  >
                    {isSaving ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        <span className="hidden sm:inline">Enregistrement...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Enregistrer
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>

            {/* Avatar Section */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6 mb-6 md:mb-8 pb-6 md:pb-8 border-b border-gray-200">
              <Avatar className="w-20 h-20 md:w-24 md:h-24 border-4 border-cyan-100">
                <AvatarImage src={profileData.avatar || userInfo?.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-blue-600 text-white text-xl md:text-2xl font-bold">
                  {getInitials()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="font-semibold text-gray-900 mb-2">Photo de profil</h3>
                <p className="text-xs md:text-sm text-gray-600 mb-4">
                  JPG, PNG ou GIF. 5MB maximum.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
                  <Button
                    variant="outline"
                    className="rounded-lg border-2"
                    disabled={!isEditingProfile}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Télécharger
                  </Button>
                  {profileData.avatar && (
                    <Button
                      variant="ghost"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      disabled={!isEditingProfile}
                    >
                      Supprimer
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Personal Info Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <FormField
                id="firstName"
                label="Prénom"
                type="text"
                icon={User}
                value={profileData.firstName}
                onValueChange={(value) =>
                  setProfileData({ ...profileData, firstName: value })
                }
                placeholder="Votre prénom"
                disabled={!isEditingProfile}
                required
                validate={(value) => {
                  if (!value.trim()) return 'Le prénom est requis';
                  if (value.trim().length < 2) return 'Le prénom doit contenir au moins 2 caractères';
                  return undefined;
                }}
              />

              <FormField
                id="lastName"
                label="Nom"
                type="text"
                icon={User}
                value={profileData.lastName}
                onValueChange={(value) =>
                  setProfileData({ ...profileData, lastName: value })
                }
                placeholder="Votre nom"
                disabled={!isEditingProfile}
                required
                validate={(value) => {
                  if (!value.trim()) return 'Le nom est requis';
                  if (value.trim().length < 2) return 'Le nom doit contenir au moins 2 caractères';
                  return undefined;
                }}
              />

              <FormField
                id="email"
                label="Email"
                type="email"
                icon={Mail}
                value={userInfo?.email || ''}
                disabled
                helperText="L'email ne peut pas être modifié"
                containerClassName="bg-gray-50"
              />

              <FormField
                id="phone"
                label="Téléphone"
                type="tel"
                icon={Phone}
                value={profileData.phone}
                onValueChange={(value) =>
                  setProfileData({ ...profileData, phone: value })
                }
                placeholder="+213 555 123 456"
                disabled={!isEditingProfile}
              />
            </div>
          </Card>
        </TabsContent>

        {/* Company Tab (Pro only) */}
        {isPro && (
          <TabsContent value="company" className="space-y-6">
            <Card className="p-4 md:p-6 bg-white border-0 shadow-md">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg md:text-xl font-semibold text-gray-900">
                  Informations entreprise
                </h2>
                {!isEditingCompany ? (
                  <Button
                    variant="outline"
                    onClick={() => setIsEditingCompany(true)}
                    className="rounded-lg border-2"
                  >
                    <Building2 className="w-4 h-4 mr-2" />
                    Modifier
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setIsEditingCompany(false);
                        // Reset to original data from database
                        if (userInfo) {
                          setCompanyData({
                            companyName: userInfo.companyName || '',
                            companyDescription: userInfo.companyDescription || '',
                            commerceRegister: userInfo.commerceRegister || '',
                            taxId: userInfo.taxId || '',
                          });
                        }
                      }}
                      className="rounded-lg"
                    >
                      Annuler
                    </Button>
                    <Button
                      onClick={handleSaveCompany}
                      disabled={isSaving}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg px-4"
                    >
                      {isSaving ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                          <span className="hidden sm:inline">Enregistrement...</span>
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Enregistrer
                        </>
                      )}
                    </Button>
                  </div>
                )}
              </div>

              {/* Company Logo */}
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 md:gap-6 mb-6 md:mb-8 pb-6 md:pb-8 border-b border-gray-200">
                <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg border-4 border-purple-100 bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white text-2xl md:text-3xl font-bold">
                  {companyData.companyName?.charAt(0) || 'E'}
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-semibold text-gray-900 mb-2">Logo entreprise</h3>
                  <p className="text-xs md:text-sm text-gray-600 mb-4">
                    Format carré recommandé. 5MB maximum.
                  </p>
                  <Button 
                    variant="outline" 
                    className="rounded-lg border-2"
                    disabled={!isEditingCompany}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Télécharger le logo
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:gap-6">
                <FormField
                  id="companyName"
                  label="Nom de l'entreprise"
                  type="text"
                  icon={Building2}
                  value={companyData.companyName}
                  onValueChange={(value) =>
                    setCompanyData({ ...companyData, companyName: value })
                  }
                  placeholder="Nom de votre entreprise"
                  disabled={!isEditingCompany}
                  required
                  validate={(value) => {
                    if (!value.trim()) return 'Le nom de l\'entreprise est requis';
                    if (value.trim().length < 2) return 'Le nom doit contenir au moins 2 caractères';
                    return undefined;
                  }}
                />

                <FormField
                  id="companyDescription"
                  label="Description"
                  type="textarea"
                  rows={4}
                  value={companyData.companyDescription}
                  onValueChange={(value) =>
                    setCompanyData({
                      ...companyData,
                      companyDescription: value,
                    })
                  }
                  placeholder="Décrivez votre activité..."
                  disabled={!isEditingCompany}
                  validate={(value) => {
                    if (value && value.length > 500) return 'Maximum 500 caractères';
                    return undefined;
                  }}
                  helperText={`${companyData.companyDescription.length}/500 caractères`}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <FormField
                    id="commerceRegister"
                    label="Registre de commerce"
                    type="text"
                    value={companyData.commerceRegister}
                    onValueChange={(value) =>
                      setCompanyData({
                        ...companyData,
                        commerceRegister: value,
                      })
                    }
                    placeholder="N° RC"
                    disabled={!isEditingCompany}
                  />

                  <FormField
                    id="taxId"
                    label="NIF"
                    type="text"
                    value={companyData.taxId}
                    onValueChange={(value) =>
                      setCompanyData({ ...companyData, taxId: value })
                    }
                    placeholder="Numéro d'identification fiscale"
                    disabled={!isEditingCompany}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>
        )}

        {/* Contact Tab */}
        <TabsContent value="contact" className="space-y-6">
          <Card className="p-4 md:p-6 bg-white border-0 shadow-md">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-6">
              Préférences de contact
            </h2>

            <div className="space-y-4 md:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-cyan-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900 text-sm md:text-base">Afficher mon téléphone</p>
                    <p className="text-xs md:text-sm text-gray-600">
                      Les utilisateurs pourront voir votre numéro
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={contactPrefs.showPhone}
                  onChange={(e) =>
                    setContactPrefs({ ...contactPrefs, showPhone: e.target.checked })
                  }
                  className="w-5 h-5 text-cyan-600 rounded flex-shrink-0"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900 text-sm md:text-base">Contact WhatsApp</p>
                    <p className="text-xs md:text-sm text-gray-600">
                      Permettre le contact via WhatsApp
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={contactPrefs.showWhatsApp}
                  onChange={(e) =>
                    setContactPrefs({
                      ...contactPrefs,
                      showWhatsApp: e.target.checked,
                    })
                  }
                  className="w-5 h-5 text-cyan-600 rounded flex-shrink-0"
                />
              </div>

              {contactPrefs.showWhatsApp && (
                <FormField
                  id="whatsappNumber"
                  label="Numéro WhatsApp"
                  type="tel"
                  icon={Phone}
                  value={contactPrefs.whatsappNumber}
                  onValueChange={(value) =>
                    setContactPrefs({
                      ...contactPrefs,
                      whatsappNumber: value,
                    })
                  }
                  placeholder="+213 555 123 456"
                  containerClassName="pl-0 sm:pl-4"
                />
              )}
            </div>

            <div className="flex justify-end mt-6 pt-6 border-t border-gray-200">
              <Button
                onClick={handleSaveContact}
                disabled={isSaving}
                className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg px-4 md:px-6"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    <span className="hidden sm:inline">Enregistrement...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Enregistrer
                  </>
                )}
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="p-4 md:p-6 bg-white border-0 shadow-md">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-6">
              Préférences de notification
            </h2>

            <div className="space-y-4 md:space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-cyan-600 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900 text-sm md:text-base">Notifications par email</p>
                    <p className="text-xs md:text-sm text-gray-600">
                      Recevoir des notifications sur votre email
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={notificationPrefs.emailNotifications}
                  onChange={(e) =>
                    setNotificationPrefs({
                      ...notificationPrefs,
                      emailNotifications: e.target.checked,
                    })
                  }
                  className="w-5 h-5 text-cyan-600 rounded shrink-0"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-green-600 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900 text-sm md:text-base">Notifications SMS</p>
                    <p className="text-xs md:text-sm text-gray-600">
                      Recevoir des SMS pour les événements importants
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={notificationPrefs.smsNotifications}
                  onChange={(e) =>
                    setNotificationPrefs({
                      ...notificationPrefs,
                      smsNotifications: e.target.checked,
                    })
                  }
                  className="w-5 h-5 text-cyan-600 rounded shrink-0"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Bell className="w-5 h-5 text-purple-600 shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900 text-sm md:text-base">Notifications push</p>
                    <p className="text-xs md:text-sm text-gray-600">
                      Recevoir des notifications dans le navigateur
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={notificationPrefs.pushNotifications}
                  onChange={(e) =>
                    setNotificationPrefs({
                      ...notificationPrefs,
                      pushNotifications: e.target.checked,
                    })
                  }
                  className="w-5 h-5 text-cyan-600 rounded shrink-0"
                />
              </div>
            </div>

            <div className="flex justify-end mt-6 pt-6 border-t border-gray-200">
              <Button
                onClick={handleSaveNotifications}
                disabled={isSaving}
                className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg px-4 md:px-6"
              >
                {isSaving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    <span className="hidden sm:inline">Enregistrement...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Enregistrer
                  </>
                )}
              </Button>
            </div>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <Card className="p-4 md:p-6 bg-white border-0 shadow-md">
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-6">
              Sécurité du compte
            </h2>

            <div className="space-y-4 md:space-y-6">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-medium text-amber-900 mb-1 text-sm md:text-base">
                      Gestion via AWS Cognito
                    </p>
                    <p className="text-xs md:text-sm text-amber-700">
                      Votre mot de passe et vos informations d&apos;authentification sont
                      gérés de manière sécurisée par AWS Cognito. Pour modifier votre
                      mot de passe ou gérer l&apos;authentification à deux facteurs,
                      veuillez vous reconnecter.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 md:space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 text-sm md:text-base">Email vérifié</p>
                    <p className="text-xs md:text-sm text-gray-600 break-all">{userInfo?.email}</p>
                  </div>
                  {userInfo?.emailVerified ? (
                    <Badge className="bg-green-500 text-white border-0 rounded-lg w-fit shrink-0">
                      Vérifié
                    </Badge>
                  ) : (
                    <Badge className="bg-yellow-500 text-white border-0 rounded-lg w-fit shrink-0">
                      Non vérifié
                    </Badge>
                  )}
                </div>

                {userInfo?.phone && (
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900 text-sm md:text-base">Téléphone vérifié</p>
                      <p className="text-xs md:text-sm text-gray-600">{userInfo.phone}</p>
                    </div>
                    {userInfo?.phoneVerified ? (
                      <Badge className="bg-green-500 text-white border-0 rounded-lg w-fit shrink-0">
                        Vérifié
                      </Badge>
                    ) : (
                      <Badge className="bg-yellow-500 text-white border-0 rounded-lg w-fit shrink-0">
                        Non vérifié
                      </Badge>
                    )}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900 text-sm md:text-base">Statut du compte</p>
                    <p className="text-xs md:text-sm text-gray-600">
                      {userInfo?.status === 'ACTIVE'
                        ? 'Compte actif'
                        : userInfo?.status}
                    </p>
                  </div>
                  <Badge
                    className={`${
                      userInfo?.status === 'ACTIVE'
                        ? 'bg-green-500'
                        : 'bg-yellow-500'
                    } text-white border-0 rounded-lg w-fit shrink-0`}
                  >
                    {userInfo?.status}
                  </Badge>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <h3 className="font-semibold text-gray-900 mb-4 text-sm md:text-base">Zone dangereuse</h3>
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-xs md:text-sm text-red-700 mb-4">
                    La suppression de votre compte est définitive et supprimera toutes
                    vos annonces, messages et données.
                  </p>
                  <Button
                    variant="outline"
                    className="border-red-300 text-red-600 hover:bg-red-100 rounded-lg w-full sm:w-auto"
                  >
                    Supprimer mon compte
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
