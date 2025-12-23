import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-20 lg:py-28 bg-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-secondary/20 mb-8">
              <Heart className="w-10 h-10 text-secondary animate-pulse" />
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              আপনিও হতে পারেন <span className="text-gradient">পরিবর্তনের অংশ</span>
            </h2>
            
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              আপনার ছোট্ট অবদানও একটি পরিবারের জীবনে বড় পরিবর্তন আনতে পারে। আজই আমাদের সাথে যুক্ত হন এবং সমাজে ইতিবাচক প্রভাব ফেলুন।
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                <Heart className="mr-2" />
                অনুদান করুন
              </Button>
              <Button variant="outline" size="lg">
                স্বেচ্ছাসেবক হন
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
