import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-image.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="সম্প্রদায়ের একতা" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient opacity-85" />
      </div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-secondary/20 blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-primary-foreground/10 blur-3xl animate-pulse-slow" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="animate-fade-up">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground mb-6 drop-shadow-lg">
            অপরাজেয়
          </h1>
          <p className="text-xl md:text-2xl lg:text-3xl text-primary-foreground/90 mb-4 max-w-3xl mx-auto">
            একসাথে আমরা অপরাজেয়
          </p>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
            সমাজের অবহেলিত ও সুবিধাবঞ্চিত মানুষদের পাশে দাঁড়িয়ে তাদের জীবনে আশার আলো জ্বালাতে প্রতিশ্রুতিবদ্ধ
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <Button variant="hero" size="lg">
            আমাদের সাথে যুক্ত হন
          </Button>
          <Button variant="heroOutline" size="lg">
            আমাদের সম্পর্কে জানুন
          </Button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/50 flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary-foreground/70 rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
