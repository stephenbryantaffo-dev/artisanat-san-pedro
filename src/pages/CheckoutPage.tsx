import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { useCart } from "@/context/CartContext";

type Step = 1 | 2;
type PaymentMethod = "mobile" | "card" | "paypal";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, subtotal, clearCart } = useCart();
  const [step, setStep] = useState<Step>(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("mobile");
  const [confirmed, setConfirmed] = useState(false);
  const [orderId] = useState(() => `SP-${Math.floor(1000 + Math.random() * 9000)}`);

  // Form state
  const [form, setForm] = useState({
    firstName: "", lastName: "", email: "", phone: "",
    address: "", city: "", country: "Côte d'Ivoire",
    mobileNumber: "", cardNumber: "", cardExpiry: "", cardCvv: "",
  });

  const updateField = (key: string, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  if (items.length === 0 && !confirmed) {
    navigate("/panier");
    return null;
  }

  if (confirmed) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6 py-24">
        <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center animate-fade-in">
          <Check className="w-12 h-12 text-primary" />
        </div>
        <h1 className="font-serif text-3xl italic text-inverse-surface mt-6">Commande confirmée !</h1>
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground mt-2">
          #{orderId}
        </span>
        <p className="text-sm text-muted-foreground font-light mt-4 max-w-xs text-center leading-relaxed">
          Vous allez recevoir une confirmation par email. Vos artisans préparent votre commande avec soin.
        </p>
        <p className="font-serif text-2xl text-primary italic mt-6">
          {subtotal.toLocaleString("fr-FR")} FCFA
        </p>
        <button
          onClick={() => {
            clearCart();
            navigate("/");
          }}
          className="mt-8 h-12 px-8 rounded-full bg-gradient-to-br from-terracotta to-terracotta-light text-primary-foreground uppercase tracking-widest text-[0.7rem] font-bold hover:opacity-90 active:scale-[0.97] transition-all"
        >
          Retour à l'accueil
        </button>
      </div>
    );
  }

  const handleConfirm = () => {
    setConfirmed(true);
  };

  const inputClass = "bg-surface-container-low rounded-xl px-4 py-3 w-full border-none text-sm outline-none focus:ring-1 focus:ring-primary transition-shadow text-foreground placeholder:text-muted-foreground";

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Top Nav */}
      <header className="glass-card fixed top-0 w-full z-50 px-6 py-4 flex justify-between items-center">
        <button
          onClick={() => (step === 2 ? setStep(1) : navigate(-1))}
          className="flex items-center gap-2 text-inverse-surface"
        >
          <ArrowLeft className="w-[18px] h-[18px]" />
          <span className="text-[10px] uppercase tracking-widest font-bold">Retour</span>
        </button>
        <span className="font-serif text-base italic text-inverse-surface tracking-tight">Checkout</span>
        <div className="w-16" />
      </header>

      {/* Step indicator */}
      <div className="px-6 pt-24 pb-6">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              step >= 1 ? "bg-primary text-primary-foreground" : "bg-surface-container text-muted-foreground"
            }`}>1</span>
            <span className={`text-[10px] uppercase tracking-widest font-bold ${
              step >= 1 ? "text-primary" : "text-muted-foreground"
            }`}>Livraison</span>
          </div>
          <div className="flex-1 h-px bg-surface-container" />
          <div className="flex items-center gap-2">
            <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
              step >= 2 ? "bg-primary text-primary-foreground" : "bg-surface-container text-muted-foreground"
            }`}>2</span>
            <span className={`text-[10px] uppercase tracking-widest font-bold ${
              step >= 2 ? "text-primary" : "text-muted-foreground"
            }`}>Paiement</span>
          </div>
        </div>
      </div>

      {step === 1 && (
        <div className="px-6 space-y-4 animate-fade-in">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label-caps text-[10px] text-muted-foreground mb-1 block">Prénom</label>
              <input value={form.firstName} onChange={(e) => updateField("firstName", e.target.value)} placeholder="Prénom" className={inputClass} />
            </div>
            <div>
              <label className="label-caps text-[10px] text-muted-foreground mb-1 block">Nom</label>
              <input value={form.lastName} onChange={(e) => updateField("lastName", e.target.value)} placeholder="Nom" className={inputClass} />
            </div>
          </div>

          <div>
            <label className="label-caps text-[10px] text-muted-foreground mb-1 block">Email</label>
            <input type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} placeholder="votre@email.com" className={inputClass} />
          </div>

          <div>
            <label className="label-caps text-[10px] text-muted-foreground mb-1 block">Téléphone</label>
            <div className="flex gap-2">
              <span className="bg-surface-container-low rounded-xl px-3 py-3 text-sm text-muted-foreground shrink-0">+225</span>
              <input type="tel" value={form.phone} onChange={(e) => updateField("phone", e.target.value)} placeholder="07 00 00 00 00" className={inputClass} />
            </div>
          </div>

          <div>
            <label className="label-caps text-[10px] text-muted-foreground mb-1 block">Adresse de livraison</label>
            <input value={form.address} onChange={(e) => updateField("address", e.target.value)} placeholder="Adresse complète" className={inputClass} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="label-caps text-[10px] text-muted-foreground mb-1 block">Ville</label>
              <input value={form.city} onChange={(e) => updateField("city", e.target.value)} placeholder="San Pedro" className={inputClass} />
            </div>
            <div>
              <label className="label-caps text-[10px] text-muted-foreground mb-1 block">Pays</label>
              <input value={form.country} onChange={(e) => updateField("country", e.target.value)} className={inputClass} />
            </div>
          </div>

          <div className="bg-accent/30 rounded-xl p-4">
            <p className="text-[10px] text-muted-foreground">
              📱 Votre numéro de téléphone sera utilisé pour les paiements Mobile Money
            </p>
          </div>

          <button
            onClick={() => setStep(2)}
            className="w-full h-14 mt-6 rounded-full bg-gradient-to-br from-terracotta to-terracotta-light text-primary-foreground uppercase tracking-widest text-[0.7rem] font-bold hover:opacity-90 active:scale-[0.97] transition-all"
          >
            Continuer →
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="px-6 animate-fade-in">
          <h2 className="font-serif text-xl italic text-inverse-surface mb-6">Mode de paiement</h2>

          <div className="space-y-3">
            {/* Mobile Money */}
            <button
              onClick={() => setPaymentMethod("mobile")}
              className={`w-full rounded-bento p-5 flex items-center gap-4 text-left transition-colors ${
                paymentMethod === "mobile"
                  ? "border-2 border-primary bg-primary/5"
                  : "border border-border/20 bg-background"
              }`}
            >
              <div className={`w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center shrink-0`}>
                {paymentMethod === "mobile" && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
              </div>
              <span className="text-2xl shrink-0">📱</span>
              <div className="flex-1">
                <p className="font-bold text-sm text-inverse-surface">Mobile Money</p>
                <p className="text-[10px] text-muted-foreground">Wave, Orange Money, MTN — Paiement local instantané</p>
              </div>
            </button>
            {paymentMethod === "mobile" && (
              <div className="pl-14">
                <input
                  value={form.mobileNumber}
                  onChange={(e) => updateField("mobileNumber", e.target.value)}
                  placeholder="Numéro Wave / Orange Money / MTN"
                  className={inputClass}
                />
              </div>
            )}

            {/* Card */}
            <button
              onClick={() => setPaymentMethod("card")}
              className={`w-full rounded-bento p-5 flex items-center gap-4 text-left transition-colors ${
                paymentMethod === "card"
                  ? "border-2 border-primary bg-primary/5"
                  : "border border-border/20 bg-background"
              }`}
            >
              <div className={`w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center shrink-0`}>
                {paymentMethod === "card" && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
              </div>
              <span className="text-2xl shrink-0">💳</span>
              <div className="flex-1">
                <p className="font-bold text-sm text-inverse-surface">Carte Bancaire</p>
                <p className="text-[10px] text-muted-foreground">Visa, Mastercard — International</p>
              </div>
            </button>
            {paymentMethod === "card" && (
              <div className="pl-14 space-y-3">
                <input value={form.cardNumber} onChange={(e) => updateField("cardNumber", e.target.value)} placeholder="Numéro de carte" className={inputClass} />
                <div className="grid grid-cols-2 gap-3">
                  <input value={form.cardExpiry} onChange={(e) => updateField("cardExpiry", e.target.value)} placeholder="MM/AA" className={inputClass} />
                  <input value={form.cardCvv} onChange={(e) => updateField("cardCvv", e.target.value)} placeholder="CVV" className={inputClass} />
                </div>
              </div>
            )}

            {/* PayPal */}
            <button
              onClick={() => setPaymentMethod("paypal")}
              className={`w-full rounded-bento p-5 flex items-center gap-4 text-left transition-colors ${
                paymentMethod === "paypal"
                  ? "border-2 border-primary bg-primary/5"
                  : "border border-border/20 bg-background"
              }`}
            >
              <div className={`w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center shrink-0`}>
                {paymentMethod === "paypal" && <div className="w-2.5 h-2.5 rounded-full bg-primary" />}
              </div>
              <span className="text-2xl shrink-0">🅿️</span>
              <div className="flex-1">
                <p className="font-bold text-sm text-inverse-surface">PayPal</p>
                <p className="text-[10px] text-muted-foreground">Paiement international sécurisé</p>
              </div>
            </button>
          </div>

          {/* Order summary mini */}
          <div className="bg-surface-container-low rounded-bento p-4 mt-6">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Sous-total</span>
              <span>{subtotal.toLocaleString("fr-FR")} FCFA</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground mt-1">
              <span>Livraison</span>
              <span className="text-primary font-medium">Gratuit</span>
            </div>
            <div className="bg-border/20 h-px my-3" />
            <div className="flex justify-between items-center">
              <span className="font-serif text-lg text-inverse-surface">Total</span>
              <span className="font-serif text-lg text-primary font-bold">
                {subtotal.toLocaleString("fr-FR")} FCFA
              </span>
            </div>
          </div>

          <button
            onClick={handleConfirm}
            className="w-full h-14 mt-4 rounded-full bg-gradient-to-br from-terracotta to-terracotta-light text-primary-foreground uppercase tracking-widest text-[0.7rem] font-bold hover:opacity-90 active:scale-[0.97] transition-all"
          >
            Confirmer la commande →
          </button>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
