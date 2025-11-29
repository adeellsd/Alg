"use client";

import { useEffect, useState } from "react";
import { Pencil, Trash2, Plus, Save, X, RefreshCw } from "lucide-react";

type PropertyTypeConfig = {
  id: string;
  code: string;
  name: string;
  nameFr: string;
  nameAr: string | null;
  category: string;
  displayOrder: number;
  isActive: boolean;
  defaultValues: any;
  requiredFields: string[];
  icon: string | null;
  iconColor: string | null;
  description: string | null;
  createdAt?: string;
  updatedAt?: string;
};

const apiBase = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002";
const adminToken = process.env.NEXT_PUBLIC_ADMIN_TOKEN;

const categories = ["RESIDENTIAL", "COMMERCIAL", "LAND"];

export default function AdminPropertyTypesPage() {
  const [items, setItems] = useState<PropertyTypeConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<PropertyTypeConfig>>({});
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createForm, setCreateForm] = useState<Partial<PropertyTypeConfig>>({
    code: "",
    nameFr: "",
    name: "",
    nameAr: "",
    category: "RESIDENTIAL",
    displayOrder: 999,
    isActive: true,
    icon: "",
    iconColor: "#0891B2",
  });

  const fetchItems = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${apiBase}/api/config/property-types?includeInactive=true`, {
        headers: adminToken ? { "x-admin-token": adminToken } : {},
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || "Échec du chargement");
      setItems(json.data.sort((a: PropertyTypeConfig, b: PropertyTypeConfig) => a.displayOrder - b.displayOrder));
    } catch (e: any) {
      setError(e.message || "Erreur de chargement");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const startEdit = (item: PropertyTypeConfig) => {
    setEditingId(item.id);
    setEditForm(item);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const handleSave = async (id: string) => {
    try {
      const res = await fetch(`${apiBase}/api/config/property-types/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...(adminToken ? { "x-admin-token": adminToken } : {}),
        },
        body: JSON.stringify(editForm),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || "Échec de la sauvegarde");
      
      setItems((prev) => prev.map((it) => (it.id === id ? json.data : it)));
      setEditingId(null);
      setEditForm({});
    } catch (e: any) {
      alert(`Erreur: ${e.message}`);
    }
  };

  const handleCreate = async () => {
    try {
      if (!createForm.code || !createForm.nameFr) {
        alert("Code et Nom (FR) sont requis");
        return;
      }

      const res = await fetch(`${apiBase}/api/config/property-types`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(adminToken ? { "x-admin-token": adminToken } : {}),
        },
        body: JSON.stringify({
          ...createForm,
          name: createForm.name || createForm.nameFr,
          defaultValues: {},
          requiredFields: [],
        }),
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || "Échec de la création");

      setItems((prev) => [...prev, json.data].sort((a, b) => a.displayOrder - b.displayOrder));
      setShowCreateForm(false);
      setCreateForm({
        code: "",
        nameFr: "",
        name: "",
        nameAr: "",
        category: "RESIDENTIAL",
        displayOrder: 999,
        isActive: true,
        icon: "",
        iconColor: "#0891B2",
      });
    } catch (e: any) {
      alert(`Erreur: ${e.message}`);
    }
  };

  const handleDelete = async (id: string, nameFr: string) => {
    if (!confirm(`Supprimer "${nameFr}" ?`)) return;
    try {
      const res = await fetch(`${apiBase}/api/config/property-types/${id}`, {
        method: "DELETE",
        headers: adminToken ? { "x-admin-token": adminToken } : {},
      });
      const json = await res.json();
      if (!json.success) throw new Error(json.error || "Échec de la suppression");
      setItems((prev) => prev.filter((i) => i.id !== id));
    } catch (e: any) {
      alert(`Erreur: ${e.message}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-3" />
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Types de propriétés</h1>
              <p className="text-gray-600 mt-1">Gérer les types de biens disponibles sur la plateforme</p>
            </div>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <Plus className="w-5 h-5" />
              Nouveau type
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Create Form */}
        {showCreateForm && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Nouveau type de propriété</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Code *</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="APARTMENT"
                  value={createForm.code || ""}
                  onChange={(e) => setCreateForm({ ...createForm, code: e.target.value.toUpperCase() })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom (FR) *</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Appartement"
                  value={createForm.nameFr || ""}
                  onChange={(e) => setCreateForm({ ...createForm, nameFr: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nom (AR)</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="شقة"
                  value={createForm.nameAr || ""}
                  onChange={(e) => setCreateForm({ ...createForm, nameAr: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                <select
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={createForm.category || "RESIDENTIAL"}
                  onChange={(e) => setCreateForm({ ...createForm, category: e.target.value })}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ordre d'affichage</label>
                <input
                  type="number"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={createForm.displayOrder ?? 999}
                  onChange={(e) => setCreateForm({ ...createForm, displayOrder: parseInt(e.target.value) })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Icône</label>
                <input
                  type="text"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Home"
                  value={createForm.icon || ""}
                  onChange={(e) => setCreateForm({ ...createForm, icon: e.target.value })}
                />
              </div>
            </div>
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={handleCreate}
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                <Save className="w-4 h-4" />
                Créer
              </button>
              <button
                onClick={() => setShowCreateForm(false)}
                className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
                Annuler
              </button>
            </div>
          </div>
        )}

        {/* Items List */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ordre
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Code
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nom (FR)
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nom (AR)
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Catégorie
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                      Aucun type de propriété configuré
                    </td>
                  </tr>
                ) : (
                  items.map((item) => {
                    const isEditing = editingId === item.id;
                    const data = isEditing ? editForm : item;

                    return (
                      <tr key={item.id} className={isEditing ? "bg-blue-50" : "hover:bg-gray-50"}>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {isEditing ? (
                            <input
                              type="number"
                              className="w-20 border border-gray-300 rounded px-2 py-1 text-sm"
                              value={data.displayOrder ?? 0}
                              onChange={(e) =>
                                setEditForm({ ...editForm, displayOrder: parseInt(e.target.value) })
                              }
                            />
                          ) : (
                            <span className="text-sm text-gray-900">{item.displayOrder}</span>
                          )}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {isEditing ? (
                            <input
                              type="text"
                              className="w-32 border border-gray-300 rounded px-2 py-1 text-sm"
                              value={data.code || ""}
                              onChange={(e) => setEditForm({ ...editForm, code: e.target.value })}
                            />
                          ) : (
                            <code className="text-sm bg-gray-100 px-2 py-1 rounded">{item.code}</code>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {isEditing ? (
                            <input
                              type="text"
                              className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                              value={data.nameFr || ""}
                              onChange={(e) => setEditForm({ ...editForm, nameFr: e.target.value })}
                            />
                          ) : (
                            <span className="text-sm font-medium text-gray-900">{item.nameFr}</span>
                          )}
                        </td>
                        <td className="px-4 py-3">
                          {isEditing ? (
                            <input
                              type="text"
                              className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                              value={data.nameAr || ""}
                              onChange={(e) => setEditForm({ ...editForm, nameAr: e.target.value })}
                            />
                          ) : (
                            <span className="text-sm text-gray-600">{item.nameAr || "—"}</span>
                          )}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {isEditing ? (
                            <select
                              className="border border-gray-300 rounded px-2 py-1 text-sm"
                              value={data.category || "RESIDENTIAL"}
                              onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
                            >
                              {categories.map((cat) => (
                                <option key={cat} value={cat}>
                                  {cat}
                                </option>
                              ))}
                            </select>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {item.category}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          {isEditing ? (
                            <input
                              type="checkbox"
                              className="w-4 h-4 text-blue-600 rounded"
                              checked={data.isActive ?? true}
                              onChange={(e) => setEditForm({ ...editForm, isActive: e.target.checked })}
                            />
                          ) : (
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                item.isActive
                                  ? "bg-green-100 text-green-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {item.isActive ? "Actif" : "Inactif"}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          {isEditing ? (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleSave(item.id)}
                                className="text-green-600 hover:text-green-800"
                                title="Sauvegarder"
                              >
                                <Save className="w-4 h-4" />
                              </button>
                              <button
                                onClick={cancelEdit}
                                className="text-gray-600 hover:text-gray-800"
                                title="Annuler"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => startEdit(item)}
                                className="text-blue-600 hover:text-blue-800"
                                title="Modifier"
                              >
                                <Pencil className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(item.id, item.nameFr)}
                                className="text-red-600 hover:text-red-800"
                                title="Supprimer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-6 text-sm text-gray-600 text-center">
          {items.length} type{items.length > 1 ? "s" : ""} configuré{items.length > 1 ? "s" : ""} •{" "}
          {items.filter((i) => i.isActive).length} actif{items.filter((i) => i.isActive).length > 1 ? "s" : ""}
        </div>
      </div>
    </div>
  );
}
