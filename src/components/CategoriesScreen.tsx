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
      name: 'Technology', 
      desc: 'Neural networks, silicon architectures, and the machine lexicon.',
      icon: <Cpu className="w-8 h-8 text-primary" />,
      img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkCbxmEj40g6ODeExoJ5IuhzW6pVDtiSK_81fnHDsu3aqHtETqUu4zvIcRcrI7OJvXf4CKyPyM1z5L15IFSRgDOhwf6teVcLkYPWsxKSUhYP6tjbGf7EWXyAVQLlzQs8gDmFIDt5mTeiXZDX7l7y2roTf3k4bVpFBHsCmMgDcFI2si8H9ryvJze4oBOPaAOdN9UK8pXyJTbXSflBed8CuWyCMI_GGbJuKqwjhqLiuo0X4xzngfGWTIhpedDFILMv-C8vdtCEOeWXlk',
      featured: true
    },
    { 
      id: 'ANIMALS' as Category, 
      name: 'Animals', 
      desc: 'Biological entities from mammals to deep-sea abyssals.',
      icon: <Dog className="w-8 h-8 text-secondary" />,
      img: '',
      count: '450 WORDS'
    },
    { 
      id: 'MOVIES' as Category, 
      name: 'Movies', 
      desc: 'Cinematic archives of the 20th and 21st centuries.',
      icon: <Clapperboard className="w-8 h-8 text-tertiary" />,
      mastery: '65%'
    },
    { 
      id: 'COUNTRIES' as Category, 
      name: 'Countries', 
      desc: 'Global geopolitical designations and regional identifiers.',
      icon: <Globe className="w-8 h-8 text-secondary" />,
      action: 'LOAD ARCHIVE'
    }
  ];

  return (
    <div className="space-y-12">
      <div className="space-y-4">
        <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter">
          SELECT <span className="text-primary italic">PROTOCOL</span>
        </h1>
        <p className="text-on-surface-variant font-body max-w-lg text-lg opacity-80">
          Choose your semantic domain. Each category contains specialized lexicons for high-frequency linguistic matches.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {categories.map((cat, idx) => (
          <motion.div
            key={cat.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectCategory(cat.id)}
            className={`cursor-pointer overflow-hidden rounded-2xl relative group ${
              cat.featured ? 'md:col-span-2 md:row-span-2 min-h-[400px]' : 'bg-surface border border-white/5 p-8 flex flex-col justify-between'
            }`}
          >
            {cat.featured ? (
              <>
                <div className="absolute inset-0 z-0">
                  <img src={cat.img} alt={cat.name} className="w-full h-full object-cover opacity-40 mix-blend-overlay group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                </div>
                <div className="relative z-10 h-full flex flex-col justify-end p-8">
                  <div className="bg-primary/20 text-primary px-3 py-1 rounded-full w-fit text-[10px] font-headline font-bold tracking-widest mb-4 border border-primary/30 uppercase">
                    Active Database
                  </div>
                  <h2 className="font-headline text-4xl font-bold mb-2">{cat.name}</h2>
                  <p className="text-on-surface-variant font-body text-sm mb-6 max-w-xs">{cat.desc}</p>
                  <div className="flex items-center gap-2 text-primary font-headline font-bold uppercase tracking-widest group-hover:gap-4 transition-all">
                    Initialize <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-start mb-8">
                  <div className="p-3 rounded-xl bg-background/50 border border-white/5">
                    {cat.icon}
                  </div>
                  {cat.count && <span className="font-headline text-[10px] text-on-surface-variant tracking-widest uppercase">{cat.count}</span>}
                </div>
                <div>
                  <h3 className="font-headline text-2xl font-bold mb-2">{cat.name}</h3>
                  <p className="text-on-surface-variant text-xs font-body opacity-60 leading-relaxed mb-4">{cat.desc}</p>
                  
                  {cat.mastery && (
                    <div className="space-y-2">
                       <div className="h-1 w-full bg-background rounded-full overflow-hidden">
                          <div className="h-full bg-secondary shadow-[0_0_10px_rgba(0,227,253,0.5)]" style={{ width: cat.mastery }} />
                       </div>
                       <span className="text-[9px] font-headline text-on-surface-variant uppercase tracking-widest block">Mastery: {cat.mastery}</span>
                    </div>
                  )}

                  {cat.action && (
                    <button className="w-full py-2.5 rounded-full border border-secondary/20 text-secondary text-[10px] font-headline font-bold uppercase tracking-widest group-hover:bg-secondary group-hover:text-background transition-colors">
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center pt-12">
        <div className="border-l-2 border-primary pl-6 py-2">
          <div className="font-headline text-[10px] text-on-surface-variant tracking-[0.3em] uppercase mb-1">Sync Status</div>
          <div className="font-headline text-xl font-bold flex items-center gap-3">
            SYSTEMS NOMINAL
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#9cff93]" />
          </div>
        </div>
        <div className="md:col-span-2 flex flex-wrap gap-8 bg-surface/40 backdrop-blur-md p-6 rounded-2xl border border-white/5">
          <div>
            <div className="font-headline text-[10px] text-on-surface-variant tracking-widest uppercase mb-1">Latency</div>
            <div className="text-2xl font-headline font-bold text-primary">12ms</div>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div>
            <div className="font-headline text-[10px] text-on-surface-variant tracking-widest uppercase mb-1">Encryption</div>
            <div className="text-2xl font-headline font-bold">256-AES</div>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div>
            <div className="font-headline text-[10px] text-on-surface-variant tracking-widest uppercase mb-1">Nodes Active</div>
            <div className="text-2xl font-headline font-bold text-secondary">4,096</div>
          </div>
        </div>
      </div>
    </div>
  );
}
