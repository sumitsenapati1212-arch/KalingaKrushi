import React, { useState } from 'react';
import {
  ShoppingBag,
  Plus,
  Search,
  Filter,
  Phone,
  MessageCircle,
  MapPin,
  Calendar,
  Sparkles,
  CheckCircle2,
  Tag,
  ArrowRight,
  X,
} from 'lucide-react';
import { Language, MarketplaceProduct, UserRole } from '../types';
import { translations } from '../translations';

interface MarketplaceProps {
  language: Language;
  role: UserRole;
  products: MarketplaceProduct[];
  onAddProduct: (product: MarketplaceProduct) => void;
}

export const Marketplace: React.FC<MarketplaceProps> = ({
  language,
  role,
  products,
  onAddProduct,
}) => {
  const t = translations[language] || translations.en;

  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<MarketplaceProduct | null>(null);
  const [orderQuantity, setOrderQuantity] = useState<number>(50);
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);

  // Form state for adding new harvest
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<MarketplaceProduct['category']>('vegetables');
  const [newPrice, setNewPrice] = useState<number>(60);
  const [newUnit, setNewUnit] = useState('kg');
  const [newQuantity, setNewQuantity] = useState<number>(500);
  const [newLocation, setNewLocation] = useState('Bhubaneswar, Odisha');
  const [newFarmerName, setNewFarmerName] = useState('Ramesh Sahu');
  const [newFarmerPhone, setNewFarmerPhone] = useState('+91 94370 82910');
  const [newGrade, setNewGrade] = useState<MarketplaceProduct['grade']>('A+');
  const [newDesc, setNewDesc] = useState('');

  // Categories list
  const categories = [
    { id: 'all', label: t.allCategories },
    { id: 'vegetables', label: t.catVegetables },
    { id: 'fruits', label: t.catFruits },
    { id: 'flowers', label: t.catFlowers },
    { id: 'exotics', label: t.catExotics },
    { id: 'seedlings', label: t.catSeedlings },
  ];

  // Filtered products
  const filteredProducts = products.filter((p) => {
    const matchesCat = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.farmerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDist = selectedDistrict === 'all' || p.location.toLowerCase().includes(selectedDistrict.toLowerCase());
    return matchesCat && matchesSearch && matchesDist;
  });

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const prod: MarketplaceProduct = {
      id: `prod-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      price: Number(newPrice),
      unit: newUnit,
      quantity: Number(newQuantity),
      location: newLocation,
      farmerName: newFarmerName,
      farmerPhone: newFarmerPhone,
      harvestDate: 'Fresh Today',
      grade: newGrade,
      imageUrl:
        newCategory === 'flowers'
          ? 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80'
          : newCategory === 'fruits'
          ? 'https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=600&q=80'
          : 'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=600&q=80',
      minOrder: 20,
      description: newDesc || 'High quality polyhouse greenhouse crop grown with drip fertigation.',
    };

    onAddProduct(prod);
    setShowAddModal(false);
    setNewTitle('');
    setNewDesc('');
  };

  const handlePlaceOrder = () => {
    setOrderSuccess(true);
    setTimeout(() => {
      setOrderSuccess(false);
      setSelectedProduct(null);
    }, 2000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-fade-in pb-12">
      {/* Marketplace Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-800 via-green-800 to-teal-900 text-white shadow-xl relative overflow-hidden border border-emerald-700">
        <div className="absolute right-0 top-0 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-emerald-200 border border-white/15 mb-3">
              <ShoppingBag className="w-3.5 h-3.5 text-lime-300" />
              <span>Direct Farm-to-Buyer e-Mandi Platform</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              {t.marketplaceTitle}
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 max-w-2xl">
              {t.marketplaceSubtitle}
            </p>
          </div>

          {/* Action button: Farmer can add harvest listing */}
          <button
            onClick={() => setShowAddModal(true)}
            className="py-3 px-5 rounded-2xl bg-gradient-to-r from-lime-400 to-emerald-400 hover:from-lime-300 hover:to-emerald-300 text-stone-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-emerald-900/40 transition active:scale-95"
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>{t.addNewProduct}</span>
          </button>
        </div>
      </div>

      {/* Filter and Category Navigation Bar (Screenshot 2 style) */}
      <div className="p-4 rounded-3xl bg-white dark:bg-stone-900 border border-slate-200/80 dark:border-stone-800 shadow-sm space-y-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                activeCategory === c.id
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                  : 'bg-slate-100 dark:bg-stone-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Search & Location Filter */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search vegetables, flowers, strawberries, or farmer name..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-stone-700 bg-slate-50 dark:bg-stone-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-400" />
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full sm:w-48 py-2.5 px-3 rounded-xl border border-slate-200 dark:border-stone-700 bg-slate-50 dark:bg-stone-800 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="all">All Odisha Clusters</option>
              <option value="Bhubaneswar">Bhubaneswar Agro Cluster</option>
              <option value="Puri">Puri / Pipili (Flower Zone)</option>
              <option value="Sambalpur">Sambalpur Polyhouse Hub</option>
              <option value="Bargarh">Bargarh Farming Belt</option>
              <option value="Kandhamal">Kandhamal / Daringbadi</option>
              <option value="Khordha">Khordha Greenhouses</option>
            </select>
          </div>
        </div>
      </div>

      {/* Product Cards Grid (Inspired by Screenshot 2 "Popular Products") */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className="group rounded-3xl bg-white dark:bg-stone-900 border border-slate-200/80 dark:border-stone-800 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Product Image */}
              <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                <img
                  src={p.imageUrl}
                  alt={p.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 backdrop-blur-md text-white border border-white/20">
                    {p.grade}
                  </span>
                  {p.discountPercent && (
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white shadow-sm">
                      {p.discountPercent}% Off Bulk
                    </span>
                  )}
                </div>

                <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-md text-white text-[11px] font-medium flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-emerald-400" />
                  <span className="truncate max-w-[120px]">{p.location.split(',')[0]}</span>
                </div>
              </div>

              {/* Product Meta */}
              <div className="p-4 space-y-2">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-emerald-600 transition">
                  {p.title}
                </h4>

                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {p.description}
                </p>

                <div className="pt-2 border-t border-slate-100 dark:border-stone-800 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 block">{t.availableStock}</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {p.quantity} {p.unit}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">{t.harvestDateLabel}</span>
                    <span className="font-medium text-emerald-600 dark:text-emerald-400">
                      {p.harvestDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Price & Action Button Footer */}
            <div className="p-4 pt-0">
              <div className="flex items-center justify-between py-2 border-t border-slate-100 dark:border-stone-800 mb-2">
                <div>
                  <span className="text-lg font-black text-emerald-700 dark:text-emerald-400">
                    ₹{p.price}
                  </span>
                  <span className="text-xs text-slate-500"> / {p.unit}</span>
                </div>
                <span className="text-[11px] text-slate-400">
                  Min {p.minOrder} {p.unit}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={`tel:${p.farmerPhone}`}
                  className="py-2 px-2 rounded-xl bg-slate-100 dark:bg-stone-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-1.5 transition"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Call</span>
                </a>

                <button
                  onClick={() => setSelectedProduct(p)}
                  className="py-2 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>{t.placeOrder}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Purchase Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white dark:bg-stone-900 rounded-3xl p-6 shadow-2xl border border-emerald-500/30 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-stone-800">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Place Order Inquiry
                </h3>
                <p className="text-xs text-slate-500">{selectedProduct.farmerName} • {selectedProduct.location}</p>
              </div>
              <button
                onClick={() => setSelectedProduct(null)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-stone-800">
              <img
                src={selectedProduct.imageUrl}
                alt={selectedProduct.title}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  {selectedProduct.title}
                </h4>
                <div className="text-sm font-black text-emerald-600 mt-1">
                  ₹{selectedProduct.price} / {selectedProduct.unit}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Quantity Required ({selectedProduct.unit})
              </label>
              <input
                type="number"
                min={selectedProduct.minOrder}
                max={selectedProduct.quantity}
                value={orderQuantity}
                onChange={(e) => setOrderQuantity(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
              />
              <div className="flex justify-between text-xs text-slate-500">
                <span>Estimated Subtotal:</span>
                <span className="font-extrabold text-slate-900 dark:text-white">
                  ₹{orderQuantity * selectedProduct.price}
                </span>
              </div>
            </div>

            {orderSuccess ? (
              <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Order inquiry sent to {selectedProduct.farmerName}!</span>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={`https://wa.me/${selectedProduct.farmerPhone.replace(/[^0-9]/g, '')}?text=Hi,%20I%20am%20interested%20in%20purchasing%20${orderQuantity}%20${selectedProduct.unit}%20of%20${encodeURIComponent(selectedProduct.title)}%20via%20PolySmart.`}
                  target="_blank"
                  rel="noreferrer"
                  className="py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{t.chatWhatsApp}</span>
                </a>

                <button
                  onClick={handlePlaceOrder}
                  className="py-3 px-4 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-md transition"
                >
                  Confirm Inquiry
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add New Listing Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-white dark:bg-stone-900 rounded-3xl p-6 shadow-2xl border border-emerald-500/30 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-stone-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {t.addNewProduct}
              </h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-full text-slate-400 hover:text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Produce Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dutch Red Bell Pepper Grade A+"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-slate-900 dark:text-white font-medium"
                  >
                    <option value="vegetables">Vegetables</option>
                    <option value="fruits">Fruits</option>
                    <option value="flowers">Flowers</option>
                    <option value="exotics">Exotics</option>
                    <option value="seedlings">Polyhouse Nursery</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Quality Grade
                  </label>
                  <select
                    value={newGrade}
                    onChange={(e) => setNewGrade(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-slate-900 dark:text-white font-medium"
                  >
                    <option value="A+">Grade A+ (Premium)</option>
                    <option value="Export Quality">Export Quality</option>
                    <option value="Organic Certified">Organic Certified</option>
                    <option value="Grade A">Grade A</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Price (₹)
                  </label>
                  <input
                    type="number"
                    required
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-slate-900 dark:text-white font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Unit
                  </label>
                  <select
                    value={newUnit}
                    onChange={(e) => setNewUnit(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-slate-900 dark:text-white"
                  >
                    <option value="kg">kg</option>
                    <option value="stem">stem</option>
                    <option value="box">box (500g)</option>
                    <option value="tray">tray (104 seedlings)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Quantity
                  </label>
                  <input
                    type="number"
                    required
                    value={newQuantity}
                    onChange={(e) => setNewQuantity(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-slate-900 dark:text-white font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Farm Cluster Location
                </label>
                <input
                  type="text"
                  required
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Describe your polyhouse farming method, variety, and packaging..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-600/30"
                >
                  Publish Listing
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
