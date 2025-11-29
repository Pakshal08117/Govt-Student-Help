import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useLang } from "@/contexts/LanguageContext";
import { CreditCard, Smartphone, Building2, Wallet, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface PaymentModalProps {
  open: boolean;
  onClose: () => void;
  amount: number;
  onSuccess: () => void;
  description: string;
}

export default function PaymentModal({
  open,
  onClose,
  amount,
  onSuccess,
  description
}: PaymentModalProps) {
  const { t } = useLang();
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [processing, setProcessing] = useState(false);
  const [upiId, setUpiId] = useState("");
  const [cardNumber, setCardNumber] = useState("");

  const paymentMethods = [
    { id: "upi", name: t("upi"), icon: Smartphone, color: "text-green-600" },
    { id: "card", name: t("card"), icon: CreditCard, color: "text-blue-600" },
    { id: "netbanking", name: t("netBanking"), icon: Building2, color: "text-purple-600" },
    { id: "wallet", name: t("wallet"), icon: Wallet, color: "text-orange-600" }
  ];

  const handlePayment = async () => {
    setProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // In production, integrate with actual payment gateway
    // For now, simulate success
    const success = Math.random() > 0.1; // 90% success rate

    if (success) {
      toast.success(t("paymentSuccess"));
      onSuccess();
      onClose();
    } else {
      toast.error(t("paymentFailed"));
    }

    setProcessing(false);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">{t("payNow")}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Amount Display */}
          <Card className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-950 dark:to-yellow-950">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">{description}</p>
                <p className="text-4xl font-bold text-primary">₹{amount}</p>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method Selection */}
          <div>
            <Label className="text-base font-semibold mb-3 block">
              {t("selectPaymentMethod")}
            </Label>
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="grid grid-cols-2 gap-3">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <div key={method.id}>
                      <RadioGroupItem
                        value={method.id}
                        id={method.id}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={method.id}
                        className="flex flex-col items-center justify-center rounded-lg border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-all"
                      >
                        <Icon className={`h-6 w-6 mb-2 ${method.color}`} />
                        <span className="text-sm font-medium">{method.name}</span>
                      </Label>
                    </div>
                  );
                })}
              </div>
            </RadioGroup>
          </div>

          {/* Payment Details Input */}
          {paymentMethod === "upi" && (
            <div className="space-y-2">
              <Label htmlFor="upi">UPI ID</Label>
              <Input
                id="upi"
                placeholder="yourname@upi"
                value={upiId}
                onChange={(e) => setUpiId(e.target.value)}
              />
            </div>
          )}

          {paymentMethod === "card" && (
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  maxLength={19}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry</Label>
                  <Input id="expiry" placeholder="MM/YY" maxLength={5} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" maxLength={3} type="password" />
                </div>
              </div>
            </div>
          )}

          {/* Security Note */}
          <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
            <p className="text-xs text-blue-900 dark:text-blue-100">
              🔒 Your payment is secure and encrypted. We don't store your payment details.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={processing}
            >
              {t("cancel")}
            </Button>
            <Button
              onClick={handlePayment}
              className="flex-1"
              disabled={processing}
            >
              {processing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Pay ₹{amount}
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
