import { Heart, Users, BookOpen, Home } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const programs = [
  {
    icon: BookOpen,
    title: "শিক্ষা কার্যক্রম",
    description: "সুবিধাবঞ্চিত শিশুদের জন্য বিনামূল্যে শিক্ষা ও বই বিতরণ কার্যক্রম পরিচালনা করি।",
  },
  {
    icon: Heart,
    title: "স্বাস্থ্যসেবা",
    description: "গ্রামীণ এলাকায় বিনামূল্যে চিকিৎসা ক্যাম্প ও ওষুধ বিতরণ কার্যক্রম।",
  },
  {
    icon: Home,
    title: "আশ্রয় প্রদান",
    description: "গৃহহীন ও দুস্থ পরিবারের জন্য নিরাপদ আশ্রয় ও পুনর্বাসন সহায়তা।",
  },
  {
    icon: Users,
    title: "নারী ক্ষমতায়ন",
    description: "নারীদের আত্মনির্ভরশীল করতে দক্ষতা উন্নয়ন ও কর্মসংস্থান সৃষ্টি।",
  },
];

const ProgramsSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            আমাদের <span className="text-gradient">কার্যক্রম</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            সমাজের বিভিন্ন স্তরে ইতিবাচক পরিবর্তন আনতে আমরা বিভিন্ন কার্যক্রম পরিচালনা করি
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, index) => (
            <Card 
              key={index} 
              variant="program"
              className="animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="text-center pb-2">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <program.icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-xl">{program.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-center text-base">
                  {program.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramsSection;
