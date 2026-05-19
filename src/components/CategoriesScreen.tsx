import { motion } from 'motion/react';
import { Category } from '../types';
import { Cpu, Dog, Clapperboard, Globe, ArrowRight } from 'lucide-react';

interface Props {
  onSelectCategory: (category: Category) => void;
}

export default function CategoriesScreen({ onSelectCategory }: Props) {
  const categories = [
    { 
      id: 'TECHNOLOGY' as Category, 
      name: 'Wissenschaft & Schule', 
      desc: 'Mathematik, Naturwissenschaften, Geisteswissenschaften und Schulalltag.',
      icon: <Cpu className="w-6 h-6 text-primary" />,
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkCbxmEj40g6ODeExoJ5IuhzW6pVDtiSK_81fnHDsu3aqHtETqUu4zvIcRcrI7OJvXf4CKyPyM1z5L15IFSRgDOhwf6teVcLkYPWsxKSUhYP6tjbGf7EWXyAVQLlzQs8gDmFIDt5mTeiXZDX7l7y2roTf3k4bVpFBHsCmMgDcFI2si8H9ryvJze4oBOPaAOdN9UK8pXyJTbXSflBed8CuWyCMI_GGbJuKqwjhqLiuo0X4xzngfGWTIhpedDFILMv-C8vdtCEOeWXlk',
      featured: true
    },
    { 
      id: 'ANIMALS' as Category, 
      name: 'Alltag & Leben', 
      desc: 'Begriffe aus dem taeglichen Leben, Freizeit, Beruf und persoenlichen Erfahrungen.',
      icon: <Dog className="w-6 h-6 text-secondary" />,
      img: '',
      count: '15 WORTE'
    },
    { 
      id: 'MOVIES' as Category, 
      name: 'Gesellschaft & Kultur', 
      desc: 'Konzepte rund um Politik, Demokratie, Medien, Kultur und menschliches Zusammenleben.',
      icon: <Clapperboard className="w-6 h-6 text-tertiary" />,
      mastery: '0%'
    },
    { 
      id: 'COUNTRIES' as Category, 
      name: 'Denken & Wissen', 
      desc: 'Abstrakte und logische Konzepte, Entwicklung, Problemloesung und kritisches Denken.',
      icon: <Globe className="w-6 h-6 text-secondary" />,
      action: 'ARCHIV LADEN'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h1 className="font-headline text-3xl md:text-5xl font-bold tracking-tighter">
          SELECT <span className="text-primary italic">PROTOCOL</span>
        </h1>
        <p className="text-on-surface-variant font-body max-w-md text-xs md:text-sm opacity-80">
          Choose your semantic domain. Each category contains specialized lexicons for high-frequency linguistic matches.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        {categories.map((cat, idx) => (
          <motion.div
            key={cat.id}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => onSelectCategory(cat.id)}
            className={`cursor-pointer overflow-hidden rounded-2xl relative group ${
              cat.featured ? 'md:col-span-2 md:row-span-2 min-h-[180px] md:min-h-[220px]' : 'bg-surface border border-white/5 p-4 flex flex-col justify-between'
            }`}
          >
            {cat.featured ? (
              <>
                <div className="absolute inset-0 z-0">
                  <img src={cat.img} alt={cat.name} className="w-full h-full object-cover opacity-30 mix-blend-overlay group-hover:scale-105 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                </div>
                <div className="relative z-10 h-full flex flex-col justify-end p-4 md:p-6">
                  <div className="bg-primary/20 text-primary px-2.5 py-0.5 rounded-full w-fit text-[9px] font-headline font-bold tracking-wider mb-2 border border-primary/30 uppercase">
                    Active Database
                  </div>
                  <h2 className="font-headline text-xl md:text-2xl font-bold mb-1">{cat.name}</h2>
                  <p className="text-on-surface-variant font-body text-xs mb-3 max-w-xs">{cat.desc}</p>
                  <div className="flex items-center gap-1.5 text-primary font-headline text-xs font-bold uppercase tracking-wider group-hover:gap-3 transition-all">
                    Initialize <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 rounded-xl bg-background/50 border border-white/5">
                    {cat.icon}
                  </div>
                  {cat.count && <span className="font-headline text-[9px] text-on-surface-variant tracking-wider uppercase">{cat.count}</span>}
                </div>
                <div>
                  <h3 className="font-headline text-lg font-bold mb-1">{cat.name}</h3>
                  <p className="text-on-surface-variant text-[11px] font-body opacity-60 leading-relaxed mb-3">{cat.desc}</p>
                  
                  {cat.mastery && (
                    <div className="space-y-1">
                       <div className="h-1 w-full bg-background rounded-full overflow-hidden">
                          <div className="h-full bg-secondary shadow-[0_0_10px_rgba(0,227,253,0.5)]" style={{ width: cat.mastery }} />
                       </div>
                       <span className="text-[8px] font-headline text-on-surface-variant uppercase tracking-widest block">Mastery: {cat.mastery}</span>
                    </div>
                  )}

                  {cat.action && (
                    <button className="w-full py-1.5 rounded-full border border-secondary/20 text-secondary text-[9px] font-headline font-bold uppercase tracking-wider group-hover:bg-secondary group-hover:text-background transition-colors">
                      {cat.action}
                    </button>
                  )}
                </div>
              </>
            )}
          </motion.div>
        ))}
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center pt-4 border-t border-white/5">
        <div className="border-l-2 border-primary pl-4 py-1">
          <div className="font-headline text-[9px] text-on-surface-variant tracking-wider uppercase mb-0.5">Sync Status</div>
          <div className="font-headline text-base font-bold flex items-center gap-2">
            SYSTEMS NOMINAL
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#9cff93]" />
          </div>
        </div>
        <div className="md:col-span-2 flex flex-wrap gap-4 bg-surface/40 backdrop-blur-md p-4 rounded-xl border border-white/5">
          <div>
            <div className="font-headline text-[9px] text-on-surface-variant tracking-wider uppercase mb-0.5">Latency</div>
            <div className="text-lg font-headline font-bold text-primary">12ms</div>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div>
            <div className="font-headline text-[9px] text-on-surface-variant tracking-wider uppercase mb-0.5">Encryption</div>
            <div className="text-lg font-headline font-bold">256-AES</div>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div>
            <div className="font-headline text-[9px] text-on-surface-variant tracking-wider uppercase mb-0.5">Nodes Active</div>
            <div className="text-lg font-headline font-bold text-secondary">4,096</div>
          </div>
        </div>
      </div>
    </div>
  );
}
