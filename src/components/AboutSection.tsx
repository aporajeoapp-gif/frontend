const AboutSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="animate-fade-up">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              আমাদের <span className="text-gradient">সম্পর্কে</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              "অপরাজেয়" একটি অলাভজনক সামাজিক সংগঠন যা ২০১৪ সাল থেকে সমাজের সুবিধাবঞ্চিত মানুষদের পাশে দাঁড়িয়ে কাজ করে আসছে। আমাদের লক্ষ্য হলো এমন একটি সমাজ গড়ে তোলা যেখানে প্রতিটি মানুষ তার মৌলিক অধিকার পাবে।
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              আমরা বিশ্বাস করি, একটি ছোট সহায়তাও কারো জীবনে বড় পরিবর্তন আনতে পারে। তাই আমরা শিক্ষা, স্বাস্থ্য, আশ্রয় এবং নারী ক্ষমতায়নের মতো বিভিন্ন ক্ষেত্রে কাজ করি।
            </p>
            
            {/* Mission & Vision */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="p-6 rounded-xl bg-primary/5 border border-primary/10">
                <h3 className="text-xl font-semibold text-primary mb-3">আমাদের লক্ষ্য</h3>
                <p className="text-muted-foreground">
                  সুবিধাবঞ্চিত মানুষদের জীবনমান উন্নয়নে কাজ করা এবং তাদের আত্মনির্ভরশীল করে তোলা।
                </p>
              </div>
              <div className="p-6 rounded-xl bg-secondary/10 border border-secondary/20">
                <h3 className="text-xl font-semibold text-secondary mb-3">আমাদের স্বপ্ন</h3>
                <p className="text-muted-foreground">
                  এমন একটি সমাজ গড়ে তোলা যেখানে কেউ অবহেলিত নয়, সবাই সমান সুযোগ পায়।
                </p>
              </div>
            </div>
          </div>
          
          {/* Visual Element */}
          <div className="relative animate-fade-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Decorative circles */}
              <div className="absolute inset-0 rounded-full bg-primary/10 animate-pulse-slow" />
              <div className="absolute inset-8 rounded-full bg-secondary/20" />
              <div className="absolute inset-16 rounded-full bg-primary/30 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-6xl md:text-7xl font-bold text-primary mb-2">১০+</div>
                  <div className="text-lg text-foreground">বছর ধরে সেবায়</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
