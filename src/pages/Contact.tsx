import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import emailjs from "@emailjs/browser";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Mail, Phone, MapPin, Loader2 } from "lucide-react";

// Initialize EmailJS
emailjs.init({
  publicKey: "YOUR_PUBLIC_KEY_HERE", // Ganti nanti
});

// Validation Schema
const contactFormSchema = z.object({
  fullName: z.string().min(2, {
    message: "Nama harus minimal 2 karakter.",
  }),
  email: z.string().email({
    message: "Email tidak valid.",
  }),
  phone: z.string().min(10, {
    message: "Nomor telepon harus minimal 10 digit.",
  }),
  subject: z.string().min(5, {
    message: "Subject harus minimal 5 karakter.",
  }),
  message: z.string().min(10, {
    message: "Pesan harus minimal 10 karakter.",
  }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const CONTACT_INFO = [
  {
    icon: Phone,
    title: "Telepon",
    value: "+62 812-3456-7890",
    description: "Hubungi kami dari Senin-Jumat, 09:00-17:00 WIB",
  },
  {
    icon: Mail,
    title: "Email",
    value: "damassdev@gmail.com",
    description: "Kami akan merespon dalam 24 jam",
  },
  {
    icon: MapPin,
    title: "Kantor",
    value: "Jakarta, Indonesia",
    description: "Kunjungi kantor kami untuk konsultasi langsung",
  },
];

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  async function onSubmit(values: ContactFormValues) {
    setIsLoading(true);
    try {
      // Kirim email menggunakan EmailJS
      // SERVICE_ID: service_contact
      // TEMPLATE_ID: template_contact_us
      // Kirim ke email: damassdev@gmail.com

      await emailjs.send(
        "service_contact", // Service ID dari EmailJS
        "template_contact_us", // Template ID dari EmailJS
        {
          to_email: "damassdev@gmail.com", // Email penerima
          from_name: values.fullName,
          from_email: values.email,
          phone: values.phone,
          subject: values.subject,
          message: values.message,
        },
      );

      toast.success("Pesan terkirim!", {
        description:
          "Terima kasih telah menghubungi kami. Kami akan segera merespon.",
      });
      form.reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Gagal mengirim pesan", {
        description:
          "Silakan coba lagi nanti atau hubungi kami melalui telepon.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/30">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-primary/5 border-b py-12">
          <div className="container text-center">
            <h1 className="text-4xl font-bold mb-4">Hubungi Kami</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ada pertanyaan atau butuh bantuan? Tim kami siap membantu Anda.
              Hubungi kami melalui form di bawah atau informasi kontak yang
              tersedia.
            </p>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="container py-12">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {CONTACT_INFO.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <div
                  key={index}
                  className="rounded-lg border border-border bg-card p-6 hover:shadow-md transition-shadow">
                  <IconComponent className="w-8 h-8 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{info.title}</h3>
                  <p className="font-medium text-primary mb-1">{info.value}</p>
                  <p className="text-sm text-muted-foreground">
                    {info.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto rounded-lg border border-border bg-card p-8">
            <h2 className="text-2xl font-bold mb-6">Kirim Pesan Anda</h2>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6">
                {/* Full Name */}
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Lengkap</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan nama lengkap Anda"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="email@contoh.com"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormDescription>
                        Kami akan mengirim balasan ke email ini
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nomor Telepon</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+62 8xx-xxxx-xxxx"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Subject */}
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Masukkan subject pesan"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Message */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pesan</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tuliskan pesan Anda di sini..."
                          className="resize-none min-h-[150px]"
                          {...field}
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormDescription>
                        Jelaskan pertanyaan atau kebutuhan Anda secara detail
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                  size="lg">
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Mengirim...
                    </>
                  ) : (
                    "Kirim Pesan"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-muted/50 border-t py-12">
          <div className="container">
            <h2 className="text-2xl font-bold text-center mb-8">
              Pertanyaan Umum
            </h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <div>
                <h3 className="font-semibold mb-2">
                  Berapa lama waktu response?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Kami biasanya merespon dalam waktu 24 jam kerja. Untuk
                  pertanyaan mendesak, silakan hubungi melalui telepon.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">
                  Apakah ada biaya untuk konsultasi?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Tidak ada biaya. Konsultasi awal dengan tim kami sepenuhnya
                  gratis.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">
                  Bagaimana status order saya?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Anda dapat melacak order di halaman tracking atau hubungi tim
                  support kami.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">
                  Apakah kalian melayani area saya?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Hubungi kami untuk mengecek ketersediaan layanan di area Anda.
                  Kami terus melakukan ekspansi.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
