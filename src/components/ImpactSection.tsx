import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { number: "৫০০০+", label: "উপকৃত পরিবার" },
  { number: "১২০+", label: "স্বেচ্ছাসেবক" },
  { number: "৫০+", label: "গ্রাম ও এলাকা" },
  { number: "১০+", label: "বছরের অভিজ্ঞতা" },
];

const ImpactSection = () => {
  return (
    <section className="py-20 lg:py-28 hero-gradient relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 right-20 w-40 h-40 rounded-full bg-secondary/20 blur-3xl" />
        <div className="absolute bottom-10 left-20 w-60 h-60 rounded-full bg-primary-foreground/5 blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-4">
            আমাদের প্রভাব
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            গত এক দশকে আমরা হাজারো মানুষের জীবনে ইতিবাচক পরিবর্তন এনেছি
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card 
              key={index} 
              variant="stat"
              className="animate-scale-in text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8">
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
                  {stat.number}
                </div>
                <div className="text-lg text-primary-foreground/80">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
