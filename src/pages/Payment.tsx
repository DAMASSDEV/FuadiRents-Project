import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Shield, Lock, CheckCircle } from "lucide-react";
import { cars } from "@/data/cars";

const Payment = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const carId = searchParams.get("carId") || "1";
  const driverFee = parseInt(searchParams.get("driverFee") || "0");
  const days = parseInt(searchParams.get("days") || "3");

  const car = cars.find((c) => c.id === carId) || cars[0];

  const [billingInfo, setBillingInfo] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });

  const [rentalInfo, setRentalInfo] = useState({
    pickupLocation: "Bogor Car Center",
    pickupDate: "2024-12-15",
    pickupTime: "10:00",
    dropoffLocation: "Bogor Car Center",
    dropoffDate: "2024-12-18",
    dropoffTime: "10:00",
  });

  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [cardInfo, setCardInfo] = useState({
    number: "",
    expiry: "",
    cvc: "",
    holder: "",
  });

  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);

  const carTotal = car.price * days;
  const driverTotal = driverFee * days;
  const subtotal = carTotal + driverTotal;
  const discount = promoApplied ? 30 : 0;
  const tax = Math.round((subtotal - discount) * 0.1);
  const total = subtotal - discount + tax;

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "MORFNT20") {
      setPromoApplied(true);
    }
  };

  const handleSubmit = () => {
    if (!agreeTerms) return;
    navigate(`/confirmation/MF-${Date.now()}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Progress Indicator */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm">
              <CheckCircle className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium">Car</span>
          </div>
          <div className="w-12 h-0.5 bg-primary" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm">
              <CheckCircle className="w-5 h-5" />
            </div>
            <span className="text-sm font-medium">Driver</span>
          </div>
          <div className="w-12 h-0.5 bg-primary" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-bold">
              3
            </div>
            <span className="text-sm font-medium text-primary">Payment</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Billing Info */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Billing Info</CardTitle>
                  <span className="text-sm text-muted-foreground">Step 1 of 4</span>
                </div>
                <p className="text-sm text-muted-foreground">Please enter your billing info</p>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    value={billingInfo.name}
                    onChange={(e) => setBillingInfo({ ...billingInfo, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="Phone number"
                    value={billingInfo.phone}
                    onChange={(e) => setBillingInfo({ ...billingInfo, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    placeholder="Address"
                    value={billingInfo.address}
                    onChange={(e) => setBillingInfo({ ...billingInfo, address: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">Town / City</Label>
                  <Input
                    id="city"
                    placeholder="Town or city"
                    value={billingInfo.city}
                    onChange={(e) => setBillingInfo({ ...billingInfo, city: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Rental Info */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Rental Info</CardTitle>
                  <span className="text-sm text-muted-foreground">Step 2 of 4</span>
                </div>
                <p className="text-sm text-muted-foreground">Please select your rental date</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Pick-Up */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                    </div>
                    <span className="font-medium">Pick - Up</span>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Locations</Label>
                      <Input
                        value={rentalInfo.pickupLocation}
                        onChange={(e) => setRentalInfo({ ...rentalInfo, pickupLocation: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Input
                        type="date"
                        value={rentalInfo.pickupDate}
                        onChange={(e) => setRentalInfo({ ...rentalInfo, pickupDate: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Time</Label>
                      <Input
                        type="time"
                        value={rentalInfo.pickupTime}
                        onChange={(e) => setRentalInfo({ ...rentalInfo, pickupTime: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                {/* Drop-Off */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full bg-secondary flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-secondary-foreground" />
                    </div>
                    <span className="font-medium">Drop - Off</span>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Locations</Label>
                      <Input
                        value={rentalInfo.dropoffLocation}
                        onChange={(e) => setRentalInfo({ ...rentalInfo, dropoffLocation: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Date</Label>
                      <Input
                        type="date"
                        value={rentalInfo.dropoffDate}
                        onChange={(e) => setRentalInfo({ ...rentalInfo, dropoffDate: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Time</Label>
                      <Input
                        type="time"
                        value={rentalInfo.dropoffTime}
                        onChange={(e) => setRentalInfo({ ...rentalInfo, dropoffTime: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Method */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Payment Method</CardTitle>
                  <span className="text-sm text-muted-foreground">Step 3 of 4</span>
                </div>
                <p className="text-sm text-muted-foreground">Please enter your payment method</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  {/* Credit Card */}
                  <div className="border rounded-lg p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="credit-card" id="credit-card" />
                        <Label htmlFor="credit-card" className="font-medium cursor-pointer">
                          Credit Card
                        </Label>
                      </div>
                      <div className="flex gap-2">
                        <CreditCard className="w-8 h-5 text-primary" />
                      </div>
                    </div>

                    {paymentMethod === "credit-card" && (
                      <div className="grid md:grid-cols-2 gap-4 pt-4 border-t">
                        <div className="md:col-span-2 space-y-2">
                          <Label>Card Number</Label>
                          <Input
                            placeholder="Card number"
                            value={cardInfo.number}
                            onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Expiration Date</Label>
                          <Input
                            placeholder="MM / YY"
                            value={cardInfo.expiry}
                            onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>CVC</Label>
                          <Input
                            placeholder="CVC"
                            value={cardInfo.cvc}
                            onChange={(e) => setCardInfo({ ...cardInfo, cvc: e.target.value })}
                          />
                        </div>
                        <div className="md:col-span-2 space-y-2">
                          <Label>Card Holder</Label>
                          <Input
                            placeholder="Card holder"
                            value={cardInfo.holder}
                            onChange={(e) => setCardInfo({ ...cardInfo, holder: e.target.value })}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* PayPal */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal" className="font-medium cursor-pointer">
                          PayPal
                        </Label>
                      </div>
                      <span className="text-primary font-bold">PayPal</span>
                    </div>
                  </div>

                  {/* Bitcoin */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <RadioGroupItem value="bitcoin" id="bitcoin" />
                        <Label htmlFor="bitcoin" className="font-medium cursor-pointer">
                          Bitcoin
                        </Label>
                      </div>
                      <span className="text-warning font-bold">₿</span>
                    </div>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Confirmation */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Confirmation</CardTitle>
                  <span className="text-sm text-muted-foreground">Step 4 of 4</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  We are getting to the end. Just a few clicks and your rental is ready!
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  <Checkbox
                    id="marketing"
                    checked={agreeMarketing}
                    onCheckedChange={(checked) => setAgreeMarketing(checked as boolean)}
                  />
                  <Label htmlFor="marketing" className="cursor-pointer text-sm">
                    I agree with sending marketing and newsletter emails. No spam, promised!
                  </Label>
                </div>
                <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                  <Checkbox
                    id="terms"
                    checked={agreeTerms}
                    onCheckedChange={(checked) => setAgreeTerms(checked as boolean)}
                  />
                  <Label htmlFor="terms" className="cursor-pointer text-sm">
                    I agree with our terms and conditions and privacy policy.
                  </Label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Rental Summary</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Prices may change depending on the length of the rental and the price of your rental car.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Car Info */}
                <div className="flex gap-4">
                  <div className="w-24 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-20 h-12 object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{car.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <span className="text-warning">★★★★☆</span>
                      <span>{car.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Car rental ({days} days)</span>
                    <span>${carTotal.toFixed(2)}</span>
                  </div>
                  {driverFee > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Driver fee ({days} days)</span>
                      <span>${driverTotal.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                {/* Promo Code */}
                <div className="border-t pt-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Apply promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      disabled={promoApplied}
                    />
                    <Button
                      variant="outline"
                      onClick={handleApplyPromo}
                      disabled={promoApplied}
                    >
                      Apply
                    </Button>
                  </div>
                  {promoApplied && (
                    <p className="text-sm text-success mt-2 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      Promo code applied! -${discount}
                    </p>
                  )}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-semibold text-lg">Total Rental Price</p>
                      <p className="text-xs text-muted-foreground">Overall price includes rental discount</p>
                    </div>
                    <span className="text-2xl font-bold">${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleSubmit}
                  disabled={!agreeTerms}
                >
                  Rent Now
                </Button>

                <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Lock className="w-4 h-4" />
                    <span>Secure payment</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Shield className="w-4 h-4" />
                    <span>SSL Encrypted</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Payment;
