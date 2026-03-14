import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
import { useState, useEffect, useRef, useCallback } from "react";

// ==================== DATA ====================
const PRODUCTS = [
  // Clothing
  {id:"1",name:"Classic Slim-Fit Oxford Shirt",cat:"Clothing",price:49.99,orig:69.99,rating:4.7,reviews:3812,badge:"Best Seller",specs:{Material:"100% Cotton",Fit:"Slim",Sizes:"XS–3XL",Care:"Machine Wash",Colors:"12 Available"},desc:"Timeless Oxford shirt crafted from premium 100% cotton. Features a button-down collar and a modern slim fit that works equally well dressed up or down.",img:"https://placehold.co/600x400/0a0f1e/00e5ff?text=Oxford+Shirt"},
  {id:"2",name:"Women's Yoga Leggings Pro",cat:"Clothing",price:59.99,orig:79.99,rating:4.9,reviews:6230,badge:"Top Rated",specs:{Material:"80% Nylon 20% Spandex",Waistband:"High-Rise",Pockets:"2 Side + 1 Back",Sizes:"XS–2XL",Feature:"4-Way Stretch"},desc:"High-performance yoga leggings with buttery-soft fabric and a squat-proof design. Perfect for yoga, running, and everyday wear.",img:"https://placehold.co/600x400/0a0f1e/ff6b35?text=Yoga+Leggings"},
  {id:"3",name:"Men's Puffer Winter Jacket",cat:"Clothing",price:129.99,orig:179.99,rating:4.8,reviews:2140,badge:"New",specs:{Fill:"600-Fill Down",Shell:"Ripstop Nylon",Pockets:"4 Zip",Sizes:"S–3XL",Weight:"580g"},desc:"Stay warm without the bulk. This lightweight puffer jacket is filled with premium 600-fill down and features a water-resistant ripstop nylon shell.",img:"https://placehold.co/600x400/0a0f1e/a855f7?text=Puffer+Jacket"},
  // Electronics
  {id:"4",name:"Wireless Noise-Cancelling Headphones",cat:"Electronics",price:199.99,orig:249.99,rating:4.8,reviews:9410,badge:"Best Seller",specs:{ANC:"Hybrid Active Noise Cancelling",Battery:"30 Hours",Driver:"40mm",Connection:"Bluetooth 5.3",Foldable:"Yes"},desc:"Industry-leading noise cancellation meets exceptional sound quality. 30-hour battery life with fast charging — 10 minutes for 3 hours of playback.",img:"https://placehold.co/600x400/0a0f1e/22c55e?text=ANC+Headphones"},
  {id:"5",name:"Smart 4K LED TV 55\"",cat:"Electronics",price:549.99,orig:699.99,rating:4.6,reviews:4320,badge:"Sale",specs:{Resolution:"4K UHD",Panel:"LED",HDR:"HDR10+",SmartOS:"Google TV",Ports:"4x HDMI 2.1"},desc:"Stunning 4K picture with Google TV built in. Access thousands of apps, cast from your phone, and enjoy brilliant HDR visuals.",img:"https://placehold.co/600x400/0a0f1e/f59e0b?text=Smart+4K+TV"},
  {id:"6",name:"Portable Bluetooth Speaker",cat:"Electronics",price:89.99,orig:109.99,rating:4.7,reviews:7650,badge:"Popular",specs:{Battery:"20 Hours",Waterproof:"IPX7",Connectivity:"Bluetooth 5.0",Output:"30W",Weight:"540g"},desc:"360° rich sound in a compact, rugged design. IPX7 waterproof rating makes it perfect for outdoor adventures, pool parties, and beach trips.",img:"https://placehold.co/600x400/0a0f1e/ec4899?text=BT+Speaker"},
  // Home & Kitchen
  {id:"7",name:"Non-Stick Cookware Set 10-Piece",cat:"Home & Kitchen",price:119.99,orig:159.99,rating:4.7,reviews:5580,badge:"Sale",specs:{Pieces:"10",Material:"Hard-Anodized Aluminum",Coating:"PFOA-Free Non-Stick",Oven:"Safe to 400°F",Dishwasher:"Safe"},desc:"Everything you need to equip your kitchen. Hard-anodized aluminum heats evenly and the PFOA-free coating ensures easy food release and cleaning.",img:"https://placehold.co/600x400/0a0f1e/06b6d4?text=Cookware+Set"},
  {id:"8",name:"Stainless Steel Water Bottle 32oz",cat:"Home & Kitchen",price:34.99,orig:44.99,rating:4.8,reviews:12300,badge:null,specs:{Capacity:"32oz / 950ml",Insulation:"Double-Wall Vacuum",HotCold:"24h Cold / 12h Hot",Material:"18/8 Stainless Steel",Lid:"Leak-Proof Twist"},desc:"Keep drinks cold for 24 hours or hot for 12. BPA-free, scratch-resistant, and built to last a lifetime with a lifetime guarantee.",img:"https://placehold.co/600x400/0a0f1e/84cc16?text=Water+Bottle"},
  {id:"9",name:"Premium Cotton Bedsheet Set",cat:"Home & Kitchen",price:79.99,orig:99.99,rating:4.6,reviews:3870,badge:null,specs:{Material:"100% Long-Staple Cotton",ThreadCount:"400 TC",Pieces:"4 (Flat, Fitted, 2 Pillowcases)",Sizes:"Queen / King",Colors:"18 Available"},desc:"Sleep in cloud-like luxury. Crafted from long-staple cotton with a 400 thread count sateen weave for silky softness that gets better with every wash.",img:"https://placehold.co/600x400/0a0f1e/f97316?text=Bedsheet+Set"},
  // Sports & Outdoors
  {id:"10",name:"Adjustable Dumbbell Set 5–52.5 lbs",cat:"Sports & Outdoors",price:299.99,orig:379.99,rating:4.9,reviews:8910,badge:"Top Rated",specs:{WeightRange:"5–52.5 lbs",Increments:"2.5 lb",Plates:"15 Weight Settings",Material:"Steel + ABS",Replaces:"15 Pairs of Dumbbells"},desc:"Replace a full rack of dumbbells with one compact set. Dial-select system lets you switch weight in seconds — perfect for home gyms.",img:"https://placehold.co/600x400/0a0f1e/8b5cf6?text=Adjustable+Dumbbells"},
  {id:"11",name:"Trail Running Shoes",cat:"Sports & Outdoors",price:139.99,orig:169.99,rating:4.7,reviews:4210,badge:"New",specs:{Upper:"Engineered Mesh",Sole:"Vibram Rubber",Drop:"8mm",Weight:"285g",Sizes:"US 6–14"},desc:"Engineered for the trails. Vibram rubber outsole delivers aggressive grip on any terrain while the responsive foam midsole cushions every step.",img:"https://placehold.co/600x400/0a0f1e/00e5ff?text=Trail+Shoes"},
  {id:"12",name:"Yoga Mat Premium 6mm",cat:"Sports & Outdoors",price:44.99,orig:59.99,rating:4.5,reviews:9780,badge:"Popular",specs:{Thickness:"6mm",Material:"TPE Eco-Friendly",Size:'72" x 24"',Texture:"Double-Sided Non-Slip",Weight:"1.1kg"},desc:"Eco-friendly TPE yoga mat with superior grip on both sides. Dense 6mm cushioning protects joints during any practice.",img:"https://placehold.co/600x400/0a0f1e/ff6b35?text=Yoga+Mat"},
  // Beauty
  {id:"13",name:"Vitamin C Brightening Serum",cat:"Beauty",price:38.99,orig:52.99,rating:4.6,reviews:6540,badge:"New",specs:{Size:"30ml",KeyIngredient:"15% Vitamin C + Hyaluronic Acid",SkinType:"All Skin Types",SPF:"None",Cruelty:"Free"},desc:"Clinical-strength 15% Vitamin C serum visibly brightens, firms, and evens skin tone. Paired with Hyaluronic Acid for deep hydration.",img:"https://placehold.co/600x400/0a0f1e/a855f7?text=Vitamin+C+Serum"},
  {id:"14",name:"Ionic Hair Dryer Pro 1875W",cat:"Beauty",price:69.99,orig:89.99,rating:4.8,reviews:7120,badge:"Best Seller",specs:{Wattage:"1875W",Technology:"Ionic + Ceramic",Speeds:"3",HeatSettings:"4",Attachments:"Diffuser + Concentrator"},desc:"Professional-grade ionic dryer that reduces frizz and drying time by 50%. Lightweight ergonomic design prevents arm fatigue.",img:"https://placehold.co/600x400/0a0f1e/22c55e?text=Hair+Dryer+Pro"},
  // Toys & Games
  {id:"15",name:"STEM Building Blocks Set 500pcs",cat:"Toys & Games",price:54.99,orig:69.99,rating:4.7,reviews:5390,badge:null,specs:{Pieces:"500",Age:"6+",Material:"ABS Plastic",Compatible:"Major Brick Brands",Includes:"3 Build Guides"},desc:"Spark creativity and develop STEM skills with 500 colorful interlocking pieces. Compatible with major brick brands and includes beginner build guides.",img:"https://placehold.co/600x400/0a0f1e/f59e0b?text=STEM+Blocks"},
  {id:"16",name:"Board Game: Strategy Quest",cat:"Toys & Games",price:42.99,orig:54.99,rating:4.9,reviews:3210,badge:"Top Rated",specs:{Players:"2–6",Age:"12+",Duration:"60–120 min",Components:"320 Cards + Tokens",Language:"English"},desc:"An award-winning strategy board game blending resource management and tactical combat. No two games are ever the same — infinite replayability.",img:"https://placehold.co/600x400/0a0f1e/ec4899?text=Strategy+Quest"},
];

const CATEGORIES = [
  {id:"clothing",name:"Clothing",icon:"👕",color:"#00e5ff"},
  {id:"electronics",name:"Electronics",icon:"📱",color:"#ff6b35"},
  {id:"home-kitchen",name:"Home & Kitchen",icon:"🏠",color:"#a855f7"},
  {id:"sports-outdoors",name:"Sports & Outdoors",icon:"🏋️",color:"#22c55e"},
  {id:"beauty",name:"Beauty",icon:"✨",color:"#f59e0b"},
  {id:"toys-games",name:"Toys & Games",icon:"🎲",color:"#06b6d4"},
  {id:"books",name:"Books",icon:"📚",color:"#84cc16"},
  {id:"food-grocery",name:"Food & Grocery",icon:"🛒",color:"#ec4899"},
];

const BLOG_POSTS = [
  {id:1,title:"Top 10 Fashion Trends for 2025",cat:"Clothing",date:"Mar 5, 2025",read:"6 min",img:"https://placehold.co/600x340/0a0f1e/00e5ff?text=Fashion+Trends+2025",excerpt:"From oversized blazers to quiet luxury, we break down the styles that will define your wardrobe this year."},
  {id:2,title:"How to Build the Perfect Home Gym on a Budget",cat:"Sports & Outdoors",date:"Feb 28, 2025",read:"8 min",img:"https://placehold.co/600x340/0a0f1e/22c55e?text=Home+Gym+Guide",excerpt:"You don't need a massive space or a huge budget to get fit at home. Here's everything you need to get started."},
  {id:3,title:"The Best Smart Home Devices Right Now",cat:"Electronics",date:"Feb 20, 2025",read:"7 min",img:"https://placehold.co/600x340/0a0f1e/ff6b35?text=Smart+Home+Devices",excerpt:"We tested dozens of smart home gadgets to find the ones truly worth your money in 2025."},
  {id:4,title:"Skincare 101: Building Your Morning Routine",cat:"Beauty",date:"Feb 12, 2025",read:"5 min",img:"https://placehold.co/600x340/0a0f1e/a855f7?text=Skincare+Routine",excerpt:"A consistent morning skincare routine doesn't have to be complicated. We'll walk you through the essential steps."},
  {id:5,title:"Best Board Games for Family Game Night",cat:"Toys & Games",date:"Feb 5, 2025",read:"6 min",img:"https://placehold.co/600x340/0a0f1e/06b6d4?text=Board+Games+2025",excerpt:"Ditch the screens and gather the family. These are the games guaranteed to spark laughter and friendly competition."},
  {id:6,title:"Kitchen Upgrades That Are Actually Worth It",cat:"Home & Kitchen",date:"Jan 28, 2025",read:"9 min",img:"https://placehold.co/600x340/0a0f1e/84cc16?text=Kitchen+Upgrades",excerpt:"Not every kitchen gadget lives up to the hype. We separate the game-changers from the gimmicks."},
];

const FAQS = [
  {q:"How long does shipping take?",a:"Standard shipping takes 3-5 business days. Express shipping (1-2 days) is available at checkout. Free shipping applies to all orders over $75."},
  {q:"What is your return policy?",a:"We offer hassle-free 30-day returns on all products. Items must be in original condition. Simply contact support and we'll send a prepaid return label."},
  {q:"Do products come with a warranty?",a:"Yes! All products come with a minimum 1-year manufacturer warranty. Many products include our extended 2-year ShopShopie warranty at no extra cost."},
  {q:"Can I track my order?",a:"Yes. Once your order ships, you'll receive a tracking number via email. You can also track your order in your account dashboard under 'My Orders'."},
  {q:"Do you price match?",a:"We offer price matching on identical products from major authorized retailers. Contact our support team with the competitor's listing for review."},
  {q:"Is my payment information secure?",a:"Absolutely. We use industry-standard SSL encryption and never store your full card details. We accept Visa, Mastercard, PayPal, and Stripe."},
];

// ==================== HELPERS ====================
const stars = (r) => "★".repeat(Math.round(r)) + "☆".repeat(5 - Math.round(r));
const badgeClass = (badge) => {
  if (!badge) return "";
  if (["New","Pro Choice","Fast","Popular","Silent"].includes(badge)) return "newbadge";
  if (["Sale","Best Seller"].includes(badge)) return "sale";
  return "";
};

// ==================== COMPONENTS ====================

// Toast
function Toast({ toast }) {
  if (!toast) return null;
  const colors = { success: "#00e5ff", error: "#ef4444", info: "#ff6b35" };
  const icons = { success: "✓", error: "✕", info: "ℹ" };
  const borderColors = { success: "#00e5ff", error: "#ef4444", info: "#ff6b35" };
  return (
    <div style={{
      position:"fixed", bottom:22, right:22, zIndex:9999,
      background:"#0d1626", border:`1px solid #1a2640`,
      borderLeft:`3px solid ${borderColors[toast.type]||borderColors.success}`,
      borderRadius:10, padding:"13px 18px",
      display:"flex", alignItems:"center", gap:9,
      fontSize:13, fontWeight:600, fontFamily:"'Rajdhani',sans-serif",
      boxShadow:"0 8px 32px rgba(0,0,0,.5)", maxWidth:300,
      animation:"slideIn .3s ease",
    }}>
      <span style={{color:colors[toast.type]||colors.success, fontSize:16}}>{icons[toast.type]||icons.success}</span>
      <span style={{color:"#e2e8f0"}}>{toast.msg}</span>
    </div>
  );
}

// Countdown
function Countdown({ endTime }) {
  const [time, setTime] = useState({ h:0, m:0, s:0 });
  useEffect(() => {
    const tick = () => {
      const diff = endTime - Date.now();
      if (diff <= 0) return;
      setTime({ h: Math.floor(diff/3600000)%24, m: Math.floor(diff/60000)%60, s: Math.floor(diff/1000)%60 });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [endTime]);
  return (
    <div style={{display:"flex", gap:8}}>
      {["H","M","S"].map((lbl,i) => (
        <div key={lbl} style={{textAlign:"center",background:"#070b14",border:"1px solid #1a2640",borderRadius:8,padding:"7px 11px",minWidth:52}}>
          <span style={{fontFamily:"'Orbitron',monospace",fontSize:"1.3rem",fontWeight:700,color:"#00e5ff",display:"block"}}>
            {String([time.h,time.m,time.s][i]).padStart(2,"0")}
          </span>
          <span style={{fontSize:9,color:"#64748b",letterSpacing:1}}>{lbl}</span>
        </div>
      ))}
    </div>
  );
}

// ProductCard
function ProductCard({ p, onNav, cart, wishlist, onAddToCart, onToggleWish }) {
  const wished = wishlist.some(i => i.id === p.id);
  const discount = p.orig ? Math.round((p.orig - p.price) / p.orig * 100) : 0;
  return (
    <div style={{background:"rgba(13,22,38,.95)",border:"1px solid #1a2640",borderRadius:12,overflow:"hidden",
      display:"flex",flexDirection:"column",height:"100%",cursor:"pointer",transition:"all .3s"}}
      onMouseEnter={e => { e.currentTarget.style.borderColor="#00e5ff"; e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow="0 12px 40px rgba(0,229,255,.12)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor="#1a2640"; e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow=""; }}>
      <div style={{position:"relative",background:"#0a0f1e",overflow:"hidden"}} onClick={() => onNav("product", p.id)}>
        <img src={p.img} alt={p.name} style={{width:"100%",height:210,objectFit:"cover",transition:"transform .4s",display:"block"}}
          onMouseEnter={e=>e.target.style.transform="scale(1.05)"} onMouseLeave={e=>e.target.style.transform=""} />
        {p.badge && <span style={{position:"absolute",top:10,left:10,
          background: badgeClass(p.badge)==="sale"?"#ff6b35": badgeClass(p.badge)==="newbadge"?"#a855f7":"#00e5ff",
          color: badgeClass(p.badge)===""?"#000":"#fff",
          fontSize:9,fontWeight:700,letterSpacing:1,padding:"3px 9px",borderRadius:4,fontFamily:"'Orbitron',monospace"}}>{p.badge}</span>}
        {discount > 0 && <span style={{position:"absolute",top:10,right:48,background:"#ff6b35",color:"#fff",fontSize:9,fontWeight:700,padding:"3px 7px",borderRadius:4,fontFamily:"'Orbitron',monospace"}}>-{discount}%</span>}
        <button onClick={e=>{e.stopPropagation();onToggleWish(p.id);}} style={{position:"absolute",top:10,right:10,
          background:"rgba(7,11,20,.8)",border:`1px solid ${wished?"#ec4899":"#1a2640"}`,
          color:wished?"#ec4899":"#64748b",width:34,height:34,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",transition:"all .2s",fontSize:15}}>
          {wished ? "♥" : "♡"}
        </button>
      </div>
      <div style={{padding:14,flex:1,display:"flex",flexDirection:"column"}} onClick={() => onNav("product", p.id)}>
        <div style={{fontSize:10,letterSpacing:2,color:"#00e5ff",textTransform:"uppercase",marginBottom:5}}>{p.cat}</div>
        <div style={{fontSize:13,fontWeight:700,color:"#e2e8f0",marginBottom:8,lineHeight:1.4}}>{p.name}</div>
        <div style={{display:"flex",alignItems:"center",gap:6,marginBottom:10}}>
          <span style={{color:"#f59e0b",fontSize:12}}>{stars(p.rating)}</span>
          <span style={{fontWeight:600,fontSize:13}}>{p.rating}</span>
          <span style={{color:"#64748b",fontSize:11}}>({p.reviews.toLocaleString()})</span>
        </div>
        <div style={{marginTop:"auto"}}>
          <span style={{fontSize:"1.3rem",fontWeight:700,color:"#00e5ff",fontFamily:"'Orbitron',monospace"}}>${p.price}</span>
          {p.orig && <span style={{fontSize:12,color:"#64748b",textDecoration:"line-through",marginLeft:7}}>${p.orig}</span>}
        </div>
      </div>
      <div style={{padding:"10px 14px",borderTop:"1px solid #1a2640"}}>
        <button onClick={e=>{e.stopPropagation();onAddToCart(p.id);}} style={{width:"100%",background:"transparent",border:"1px solid #1a2640",color:"#e2e8f0",padding:9,borderRadius:8,fontFamily:"'Rajdhani',sans-serif",fontWeight:600,cursor:"pointer",transition:"all .2s",display:"flex",alignItems:"center",justifyContent:"center",gap:7,fontSize:13}}
          onMouseEnter={e=>{e.target.style.background="#00e5ff";e.target.style.borderColor="#00e5ff";e.target.style.color="#000";}}
          onMouseLeave={e=>{e.target.style.background="transparent";e.target.style.borderColor="#1a2640";e.target.style.color="#e2e8f0";}}>
          🛍 Add to Cart
        </button>
      </div>
    </div>
  );
}

// ==================== PAGES ====================

function HomePage({ onNav, cart, wishlist, onAddToCart, onToggleWish }) {
  const endTime = useRef(Date.now() + 3*3600000 + 45*60000).current;
  return (
    <div>
      {/* Hero */}
      <div style={{minHeight:"90vh",display:"flex",alignItems:"center",position:"relative",overflow:"hidden",background:"linear-gradient(135deg,#070b14 0%,#0a1428 50%,#070b14 100%)"}}>
        <div style={{position:"absolute",inset:0,backgroundImage:"linear-gradient(#1a2640 1px,transparent 1px),linear-gradient(90deg,#1a2640 1px,transparent 1px)",backgroundSize:"60px 60px",opacity:.4}} />
        <div style={{position:"absolute",width:600,height:600,borderRadius:"50%",background:"radial-gradient(circle,rgba(0,229,255,.08) 0%,transparent 70%)",top:-100,right:-100,pointerEvents:"none"}} />
        <div style={{position:"absolute",width:400,height:400,borderRadius:"50%",background:"radial-gradient(circle,rgba(255,107,53,.07) 0%,transparent 70%)",bottom:-50,left:"10%",pointerEvents:"none"}} />
        <div className="container" style={{position:"relative",zIndex:1,padding:"60px 16px"}}>
          <div style={{maxWidth:680}}>
            <div style={{display:"inline-block",background:"rgba(0,229,255,.1)",border:"1px solid rgba(0,229,255,.3)",color:"#00e5ff",fontSize:10,letterSpacing:3,padding:"6px 16px",borderRadius:4,marginBottom:20,fontFamily:"'Orbitron',monospace"}}>
              EVERYTHING YOU NEED
            </div>
            <h1 style={{fontSize:"clamp(2.2rem,5.5vw,4.5rem)",fontWeight:900,lineHeight:1.1,color:"#fff",fontFamily:"'Orbitron',monospace",letterSpacing:1,marginBottom:20}}>
              SHOP SMARTER,<br /><span style={{color:"#00e5ff",textShadow:"0 0 30px rgba(0,229,255,.5)"}}>LIVE BETTER</span>
            </h1>
            <p style={{color:"#94a3b8",fontSize:"1.05rem",lineHeight:1.7,marginBottom:32,fontFamily:"'Rajdhani',sans-serif",maxWidth:520}}>
              Thousands of products across fashion, electronics, home, beauty, and more. Quality you can trust, prices you'll love.
            </p>
            <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
              <button onClick={() => onNav("shop")} style={{background:"linear-gradient(135deg,#00e5ff,#0080ff)",border:"none",color:"#000",fontFamily:"'Orbitron',monospace",fontSize:11,fontWeight:700,letterSpacing:2,padding:"12px 28px",borderRadius:8,cursor:"pointer",transition:"all .3s",display:"inline-flex",alignItems:"center",gap:7}}
                onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
                onMouseLeave={e=>e.currentTarget.style.transform=""}>
                🛒 SHOP NOW
              </button>
              <button onClick={() => onNav("deals")} style={{background:"transparent",border:"1px solid #00e5ff",color:"#00e5ff",fontFamily:"'Orbitron',monospace",fontSize:11,fontWeight:700,letterSpacing:2,padding:"12px 28px",borderRadius:8,cursor:"pointer",transition:"all .3s",display:"inline-flex",alignItems:"center",gap:7}}
                onMouseEnter={e=>{e.currentTarget.style.background="rgba(0,229,255,.1)";e.currentTarget.style.transform="translateY(-2px)";}}
                onMouseLeave={e=>{e.currentTarget.style.background="transparent";e.currentTarget.style.transform="";}}>
                ⚡ VIEW DEALS
              </button>
            </div>
            <div style={{display:"flex",gap:32,marginTop:40,flexWrap:"wrap"}}>
              {[["50K+","Happy Customers"],["16+","Premium Brands"],["99.9%","Uptime Guarantee"]].map(([num,lbl])=>(
                <div key={lbl}>
                  <div style={{fontFamily:"'Orbitron',monospace",fontSize:"1.4rem",fontWeight:700,color:"#00e5ff"}}>{num}</div>
                  <div style={{fontSize:12,color:"#64748b",letterSpacing:1}}>{lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Strip */}
      <div style={{background:"#0a0f1e",borderTop:"1px solid #1a2640",borderBottom:"1px solid #1a2640",padding:"20px 0"}}>
        <div className="container" style={{display:"flex",justifyContent:"space-around",flexWrap:"wrap",gap:16,padding:"0 16px"}}>
          {[["🚚","Free Shipping","On orders $75+"],["🛡","2-Year Warranty","All products"],["↩","30-Day Returns","Hassle-free"],["⭐","50K+ Reviews","Trusted by gamers"]].map(([ic,t,s])=>(
            <div key={t} style={{display:"flex",alignItems:"center",gap:12}}>
              <span style={{fontSize:"1.5rem"}}>{ic}</span>
              <div>
                <div style={{fontFamily:"'Orbitron',monospace",fontSize:11,fontWeight:700,color:"#fff",letterSpacing:1}}>{t}</div>
                <div style={{fontSize:11,color:"#64748b"}}>{s}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div style={{padding:"72px 16px"}}>
        <div className="container">
          <div style={{marginBottom:36}}>
            <span style={{fontSize:10,letterSpacing:4,color:"#00e5ff",textTransform:"uppercase",display:"block",marginBottom:7}}>Browse</span>
            <h2 style={{fontFamily:"'Orbitron',monospace",fontSize:"clamp(1.4rem,3vw,2rem)",fontWeight:700,color:"#fff"}}>CATEGORIES</h2>
            <div style={{width:56,height:2,background:"linear-gradient(90deg,#00e5ff,transparent)",marginTop:10}} />
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",gap:16}}>
            {CATEGORIES.map(c => {
              const count = PRODUCTS.filter(p => p.cat === c.name).length;
              return (
                <div key={c.id} onClick={() => onNav("shop", null, c.name)}
                  style={{background:"rgba(13,22,38,.95)",border:"1px solid #1a2640",borderRadius:12,padding:"26px 18px",textAlign:"center",cursor:"pointer",transition:"all .3s"}}
                  onMouseEnter={e=>{e.currentTarget.style.borderColor=c.color;e.currentTarget.style.transform="translateY(-4px)";}}
                  onMouseLeave={e=>{e.currentTarget.style.borderColor="#1a2640";e.currentTarget.style.transform="";}}>
                  <span style={{fontSize:"2.2rem",display:"block",marginBottom:10}}>{c.icon}</span>
                  <div style={{fontFamily:"'Orbitron',monospace",fontSize:11,fontWeight:700,letterSpacing:2,color:"#fff",textTransform:"uppercase"}}>{c.name}</div>
                  <div style={{fontSize:11,color:"#64748b",marginTop:3}}>{count} products</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div style={{padding:"0 16px 72px"}}>
        <div className="container">
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",marginBottom:36,flexWrap:"wrap",gap:12}}>
            <div>
              <span style={{fontSize:10,letterSpacing:4,color:"#00e5ff",textTransform:"uppercase",display:"block",marginBottom:7}}>Featured</span>
              <h2 style={{fontFamily:"'Orbitron',monospace",fontSize:"clamp(1.4rem,3vw,2rem)",fontWeight:700,color:"#fff"}}>TOP PRODUCTS</h2>
              <div style={{width:56,height:2,background:"linear-gradient(90deg,#00e5ff,transparent)",marginTop:10}} />
            </div>
            <button onClick={() => onNav("shop")} style={{background:"transparent",border:"1px solid #00e5ff",color:"#00e5ff",fontFamily:"'Orbitron',monospace",fontSize:10,fontWeight:700,letterSpacing:2,padding:"10px 20px",borderRadius:8,cursor:"pointer"}}>
              VIEW ALL →
            </button>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:20}}>
            {PRODUCTS.slice(0,8).map(p => (
              <ProductCard key={p.id} p={p} onNav={onNav} cart={cart} wishlist={wishlist} onAddToCart={onAddToCart} onToggleWish={onToggleWish} />
            ))}
          </div>
        </div>
      </div>

      {/* Flash Sale Banner */}
      <div style={{background:"linear-gradient(135deg,#0a0f1e,rgba(0,229,255,.04),#0a0f1e)",border:"1px solid #1a2640",padding:"40px 16px"}}>
        <div className="container" style={{display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:24}}>
          <div>
            <div style={{fontFamily:"'Orbitron',monospace",fontSize:"1.6rem",fontWeight:900,color:"#fff",marginBottom:6}}>⚡ FLASH SALE</div>
            <p style={{color:"#64748b",marginBottom:16,fontFamily:"'Rajdhani',sans-serif"}}>Deals ending soon. Don't miss out!</p>
            <Countdown endTime={Date.now() + 3*3600000 + 45*60000} />
          </div>
          <button onClick={() => onNav("deals")} style={{background:"linear-gradient(135deg,#ff6b35,#ff3d00)",border:"none",color:"#fff",fontFamily:"'Orbitron',monospace",fontSize:12,fontWeight:700,letterSpacing:2,padding:"14px 32px",borderRadius:8,cursor:"pointer",transition:"all .3s"}}
            onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
            onMouseLeave={e=>e.currentTarget.style.transform=""}>
            VIEW DEALS
          </button>
        </div>
      </div>
    </div>
  );
}

function ShopPage({ onNav, cart, wishlist, onAddToCart, onToggleWish, initialCategory }) {
  const [filter, setFilter] = useState({ cats: initialCategory ? [initialCategory] : [], maxPrice: 1500, sort: "featured", minRating: 0 });
  const [page, setPage] = useState(1);
  const PER_PAGE = 12;

  const allCats = [...new Set(PRODUCTS.map(p => p.cat))];

  const filtered = PRODUCTS.filter(p => {
    if (filter.cats.length && !filter.cats.includes(p.cat)) return false;
    if (p.price > filter.maxPrice) return false;
    if (p.rating < filter.minRating) return false;
    return true;
  }).sort((a,b) => {
    if (filter.sort === "price-asc") return a.price - b.price;
    if (filter.sort === "price-desc") return b.price - a.price;
    if (filter.sort === "rating") return b.rating - a.rating;
    if (filter.sort === "reviews") return b.reviews - a.reviews;
    return 0;
  });

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paged = filtered.slice((page-1)*PER_PAGE, page*PER_PAGE);

  const toggleCat = (cat) => {
    setFilter(f => ({...f, cats: f.cats.includes(cat) ? f.cats.filter(c=>c!==cat) : [...f.cats, cat]}));
    setPage(1);
  };

  const inputStyle = {background:"#0d1626",border:"1px solid #1a2640",color:"#e2e8f0",borderRadius:8,padding:"11px 15px",fontFamily:"'Rajdhani',sans-serif",fontSize:14,outline:"none",width:"100%"};

  return (
    <div>
      <div style={{padding:"52px 0 36px",position:"relative",borderBottom:"1px solid #1a2640"}}>
        <div style={{position:"absolute",inset:0,background:"linear-gradient(135deg,rgba(0,229,255,.03) 0%,transparent 50%)"}} />
        <div className="container" style={{position:"relative",padding:"0 16px"}}>
          <div style={{display:"flex",gap:7,alignItems:"center",fontSize:12,color:"#64748b",marginBottom:20}}>
            <span style={{cursor:"pointer"}} onClick={() => onNav("home")}>Home</span>
            <span>/</span><span>Shop</span>
          </div>
          <h1 style={{fontFamily:"'Orbitron',monospace",fontSize:"clamp(1.4rem,4vw,2.3rem)",color:"#fff"}}>ALL PRODUCTS</h1>
          <p style={{color:"#64748b",fontSize:13,marginTop:6}}>{filtered.length} products</p>
        </div>
      </div>
      <div className="container" style={{padding:"36px 16px 72px"}}>
        <div style={{display:"grid",gridTemplateColumns:"240px 1fr",gap:32,alignItems:"start"}}>
          {/* Filters */}
          <div style={{background:"rgba(13,22,38,.95)",border:"1px solid #1a2640",borderRadius:12,padding:18,position:"sticky",top:72}}>
            <div style={{fontFamily:"'Orbitron',monospace",fontSize:10,letterSpacing:2,color:"#00e5ff",textTransform:"uppercase",marginBottom:14}}>Categories</div>
            {allCats.map(cat => (
              <label key={cat} style={{display:"flex",alignItems:"center",gap:9,padding:"5px 0",cursor:"pointer",fontSize:13,color:filter.cats.includes(cat)?"#e2e8f0":"#64748b"}}>
                <input type="checkbox" checked={filter.cats.includes(cat)} onChange={() => toggleCat(cat)} style={{accentColor:"#00e5ff",cursor:"pointer"}} /> {cat}
              </label>
            ))}
            <div style={{marginTop:18}}>
              <div style={{fontFamily:"'Orbitron',monospace",fontSize:10,letterSpacing:2,color:"#00e5ff",textTransform:"uppercase",marginBottom:7}}>Max Price</div>
              <div style={{color:"#00e5ff",fontFamily:"'Orbitron',monospace",fontSize:13,marginBottom:7}}>Up to ${filter.maxPrice}</div>
              <input type="range" min={0} max={1500} value={filter.maxPrice} style={{accentColor:"#00e5ff",width:"100%"}}
                onChange={e => { setFilter(f => ({...f, maxPrice:parseInt(e.target.value)})); setPage(1); }} />
            </div>
            <div style={{marginTop:18}}>
              <div style={{fontFamily:"'Orbitron',monospace",fontSize:10,letterSpacing:2,color:"#00e5ff",textTransform:"uppercase",marginBottom:7}}>Min Rating</div>
              <select style={{...inputStyle,padding:"8px 12px",fontSize:13}} value={filter.minRating}
                onChange={e => { setFilter(f => ({...f, minRating: parseFloat(e.target.value)})); setPage(1); }}>
                <option value={0}>Any Rating</option>
                <option value={4}>4★ & above</option>
                <option value={4.5}>4.5★ & above</option>
              </select>
            </div>
            <button onClick={() => { setFilter({cats:[],maxPrice:1500,sort:"featured",minRating:0}); setPage(1); }}
              style={{width:"100%",background:"transparent",border:"1px solid #00e5ff",color:"#00e5ff",fontFamily:"'Orbitron',monospace",fontSize:10,fontWeight:700,letterSpacing:2,padding:9,borderRadius:8,cursor:"pointer",marginTop:16}}>
              RESET FILTERS
            </button>
          </div>
          {/* Products */}
          <div>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24,flexWrap:"wrap",gap:12}}>
              <span style={{color:"#64748b",fontSize:13}}>{filtered.length} results</span>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <span style={{color:"#64748b",fontSize:12}}>Sort:</span>
                <select style={{...inputStyle,width:"auto",padding:"7px 12px",fontSize:13}} value={filter.sort}
                  onChange={e => { setFilter(f => ({...f, sort:e.target.value})); setPage(1); }}>
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Best Rated</option>
                  <option value="reviews">Most Reviewed</option>
                </select>
              </div>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:20}}>
              {paged.map(p => <ProductCard key={p.id} p={p} onNav={onNav} cart={cart} wishlist={wishlist} onAddToCart={onAddToCart} onToggleWish={onToggleWish} />)}
            </div>
            {totalPages > 1 && (
              <div style={{display:"flex",justifyContent:"center",gap:8,marginTop:40,flexWrap:"wrap"}}>
                {Array.from({length:totalPages},(_,i)=>i+1).map(n => (
                  <button key={n} onClick={() => setPage(n)} style={{
                    background: page===n?"linear-gradient(135deg,#00e5ff,#0080ff)":"transparent",
                    border: page===n?"none":"1px solid #1a2640",
                    color: page===n?"#000":"#64748b",
                    fontFamily:"'Orbitron',monospace",fontSize:11,fontWeight:700,
                    padding:"8px 14px",borderRadius:6,cursor:"pointer"}}>{n}</button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductPage({ productId, onNav, onAddToCart, onToggleWish, wishlist }) {
  const p = PRODUCTS.find(x => x.id === productId);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("specs");
  if (!p) return <div style={{padding:72,textAlign:"center",color:"#64748b"}}>Product not found.</div>;
  const wished = wishlist.some(i => i.id === p.id);
  const related = PRODUCTS.filter(x => x.cat === p.cat && x.id !== p.id).slice(0,4);
  const inputStyle = {background:"#0d1626",border:"1px solid #1a2640",color:"#e2e8f0",borderRadius:8,padding:"11px 15px",fontFamily:"'Rajdhani',sans-serif",fontSize:14,outline:"none"};
  return (
    <div style={{padding:"36px 16px 72px"}} className="container">
      <div style={{display:"flex",gap:7,alignItems:"center",fontSize:12,color:"#64748b",marginBottom:24,flexWrap:"wrap"}}>
        <span style={{cursor:"pointer"}} onClick={() => onNav("home")}>Home</span><span>/</span>
        <span style={{cursor:"pointer"}} onClick={() => onNav("shop")}>Shop</span><span>/</span>
        <span>{p.name}</span>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:48,alignItems:"start"}}>
        <div>
          <img src={p.img} alt={p.name} style={{width:"100%",borderRadius:12,border:"1px solid #1a2640"}} />
        </div>
        <div>
          <div style={{fontSize:10,letterSpacing:2,color:"#00e5ff",textTransform:"uppercase",marginBottom:8}}>{p.cat}</div>
          <h1 style={{fontFamily:"'Orbitron',monospace",fontSize:"clamp(1.2rem,2.5vw,1.7rem)",color:"#fff",fontWeight:700,marginBottom:12}}>{p.name}</h1>
          <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:20}}>
            <span style={{color:"#f59e0b",fontSize:16}}>{stars(p.rating)}</span>
            <span style={{fontWeight:700}}>{p.rating}</span>
            <span style={{color:"#64748b",fontSize:13}}>({p.reviews.toLocaleString()} reviews)</span>
          </div>
          <div style={{marginBottom:24}}>
            <span style={{fontFamily:"'Orbitron',monospace",fontSize:"2rem",fontWeight:700,color:"#00e5ff"}}>${p.price}</span>
            {p.orig && <span style={{fontSize:14,color:"#64748b",textDecoration:"line-through",marginLeft:10}}>${p.orig}</span>}
            {p.orig && <span style={{marginLeft:8,background:"rgba(255,107,53,.15)",color:"#ff6b35",fontSize:11,padding:"2px 8px",borderRadius:4}}>SAVE ${(p.orig-p.price).toFixed(2)}</span>}
          </div>
          <p style={{color:"#94a3b8",lineHeight:1.7,marginBottom:24,fontFamily:"'Rajdhani',sans-serif"}}>{p.desc}</p>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:20}}>
            <span style={{color:"#64748b",fontSize:12}}>QTY:</span>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <button onClick={() => setQty(q => Math.max(1,q-1))} style={{...inputStyle,padding:0,width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:18}}>−</button>
              <span style={{fontFamily:"'Orbitron',monospace",fontWeight:700,fontSize:16,minWidth:28,textAlign:"center"}}>{qty}</span>
              <button onClick={() => setQty(q => q+1)} style={{...inputStyle,padding:0,width:36,height:36,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:18}}>+</button>
            </div>
          </div>
          <div style={{display:"flex",gap:12,flexWrap:"wrap"}}>
            <button onClick={() => { onAddToCart(p.id, qty); }} style={{background:"linear-gradient(135deg,#00e5ff,#0080ff)",border:"none",color:"#000",fontFamily:"'Orbitron',monospace",fontSize:11,fontWeight:700,letterSpacing:2,padding:"12px 24px",borderRadius:8,cursor:"pointer",transition:"all .3s"}}>
              🛒 ADD TO CART
            </button>
            <button onClick={() => onToggleWish(p.id)} style={{background:"transparent",border:`1px solid ${wished?"#ec4899":"#1a2640"}`,color:wished?"#ec4899":"#64748b",fontFamily:"'Orbitron',monospace",fontSize:11,fontWeight:700,letterSpacing:2,padding:"12px 16px",borderRadius:8,cursor:"pointer",transition:"all .3s"}}>
              {wished ? "♥" : "♡"}
            </button>
          </div>
          <div style={{display:"flex",gap:16,marginTop:24,padding:"16px 0",borderTop:"1px solid #1a2640",flexWrap:"wrap"}}>
            {[["🚚","Free Shipping"],["↩","30-Day Returns"],["🛡","2-Year Warranty"]].map(([ic,txt]) => (
              <div key={txt} style={{display:"flex",alignItems:"center",gap:6,fontSize:12,color:"#64748b"}}><span>{ic}</span>{txt}</div>
            ))}
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div style={{marginTop:48}}>
        <div style={{borderBottom:"1px solid #1a2640",display:"flex",gap:0,marginBottom:24}}>
          {["specs","description"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{background:"none",border:"none",borderBottom:`2px solid ${tab===t?"#00e5ff":"transparent"}`,color:tab===t?"#00e5ff":"#64748b",fontFamily:"'Orbitron',monospace",fontSize:10,letterSpacing:2,padding:"9px 14px",cursor:"pointer",textTransform:"uppercase",marginBottom:-1}}>
              {t}
            </button>
          ))}
        </div>
        {tab === "specs" ? (
          <div style={{maxWidth:500}}>
            {Object.entries(p.specs).map(([k,v]) => (
              <div key={k} style={{display:"flex",padding:"9px 0",borderBottom:"1px solid #1a2640",fontSize:13}}>
                <span style={{color:"#64748b",width:140,flexShrink:0}}>{k}</span>
                <span style={{color:"#e2e8f0",fontWeight:600}}>{v}</span>
              </div>
            ))}
          </div>
        ) : (
          <p style={{color:"#94a3b8",lineHeight:1.8,maxWidth:640,fontFamily:"'Rajdhani',sans-serif"}}>{p.desc}</p>
        )}
      </div>
      {/* Related */}
      {related.length > 0 && (
        <div style={{marginTop:64}}>
          <h2 style={{fontFamily:"'Orbitron',monospace",fontSize:"1.2rem",color:"#fff",marginBottom:24}}>RELATED PRODUCTS</h2>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:20}}>
            {related.map(rp => <ProductCard key={rp.id} p={rp} onNav={onNav} cart={[]} wishlist={wishlist} onAddToCart={onAddToCart} onToggleWish={onToggleWish} />)}
          </div>
        </div>
      )}
    </div>
  );
}

function CartPage({ cart, onNav, onRemove, onUpdateQty }) {
  const subtotal = cart.reduce((s,i) => s+i.price*i.qty, 0);
  const shipping = subtotal >= 75 ? 0 : 9.99;
  const total = subtotal + shipping;
  return (
    <div>
      <div style={{padding:"52px 0 36px",borderBottom:"1px solid #1a2640"}}>
        <div className="container" style={{padding:"0 16px"}}>
          <div style={{display:"flex",gap:7,alignItems:"center",fontSize:12,color:"#64748b",marginBottom:20}}>
            <span style={{cursor:"pointer"}} onClick={() => onNav("home")}>Home</span><span>/</span><span>Cart</span>
          </div>
          <h1 style={{fontFamily:"'Orbitron',monospace",fontSize:"clamp(1.4rem,4vw,2rem)",color:"#fff"}}>SHOPPING CART</h1>
          <p style={{color:"#64748b",fontSize:13,marginTop:6}}>{cart.reduce((s,i)=>s+i.qty,0)} items</p>
        </div>
      </div>
      <div className="container" style={{padding:"36px 16px 72px"}}>
        {cart.length === 0 ? (
          <div style={{textAlign:"center",padding:"72px 0"}}>
            <div style={{fontSize:"3rem",marginBottom:16}}>🛒</div>
            <h2 style={{fontFamily:"'Orbitron',monospace",color:"#fff",marginBottom:12}}>YOUR CART IS EMPTY</h2>
            <p style={{color:"#64748b",marginBottom:28}}>Looks like you haven't added anything yet.</p>
            <button onClick={() => onNav("shop")} style={{background:"linear-gradient(135deg,#00e5ff,#0080ff)",border:"none",color:"#000",fontFamily:"'Orbitron',monospace",fontSize:11,fontWeight:700,letterSpacing:2,padding:"12px 28px",borderRadius:8,cursor:"pointer"}}>BROWSE PRODUCTS</button>
          </div>
        ) : (
          <div style={{display:"grid",gridTemplateColumns:"1fr 340px",gap:32,alignItems:"start"}}>
            <div style={{background:"rgba(13,22,38,.95)",border:"1px solid #1a2640",borderRadius:12,padding:22}}>
              {cart.map(item => (
                <div key={item.id} style={{display:"flex",gap:14,padding:"14px 0",borderBottom:"1px solid #1a2640",alignItems:"center"}}>
                  <img src={item.img} alt={item.name} onClick={() => onNav("product", item.id)} style={{width:76,height:56,objectFit:"cover",borderRadius:8,border:"1px solid #1a2640",flexShrink:0,cursor:"pointer"}} />
                  <div style={{flex:1}}>
                    <div style={{fontSize:13,fontWeight:700,marginBottom:4,cursor:"pointer"}} onClick={() => onNav("product", item.id)}>{item.name}</div>
                    <div style={{color:"#00e5ff",fontFamily:"'Orbitron',monospace",fontSize:12}}>${item.price}</div>
                  </div>
                  <div style={{display:"flex",alignItems:"center",gap:7}}>
                    <button onClick={() => onUpdateQty(item.id, item.qty-1)} style={{background:"#070b14",border:"1px solid #1a2640",color:"#e2e8f0",width:28,height:28,borderRadius:6,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>−</button>
                    <span style={{fontFamily:"'Orbitron',monospace",fontSize:12,minWidth:20,textAlign:"center"}}>{item.qty}</span>
                    <button onClick={() => onUpdateQty(item.id, item.qty+1)} style={{background:"#070b14",border:"1px solid #1a2640",color:"#e2e8f0",width:28,height:28,borderRadius:6,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>+</button>
                  </div>
                  <div style={{fontFamily:"'Orbitron',monospace",fontSize:13,fontWeight:700,color:"#00e5ff",minWidth:64,textAlign:"right"}}>${(item.price*item.qty).toFixed(2)}</div>
                  <button onClick={() => onRemove(item.id)} style={{background:"none",border:"none",color:"#ef4444",cursor:"pointer",fontSize:16,padding:"0 4px"}}>✕</button>
                </div>
              ))}
            </div>
            <div style={{background:"rgba(13,22,38,.95)",border:"1px solid #1a2640",borderRadius:12,padding:22,position:"sticky",top:80}}>
              <div style={{fontSize:12,fontWeight:700,letterSpacing:2,color:"#00e5ff",textTransform:"uppercase",marginBottom:18,fontFamily:"'Orbitron',monospace"}}>ORDER SUMMARY</div>
              {[["Subtotal", `$${subtotal.toFixed(2)}`], ["Shipping", shipping===0?"FREE":`$${shipping.toFixed(2)}`], ["Tax (est.)", `$${(subtotal*.08).toFixed(2)}`]].map(([k,v]) => (
                <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"9px 0",borderBottom:"1px solid #1a2640",fontSize:14}}>
                  <span style={{color:"#64748b"}}>{k}</span><span>{v}</span>
                </div>
              ))}
              <div style={{display:"flex",justifyContent:"space-between",padding:"12px 0",fontSize:17,fontWeight:700,color:"#00e5ff",fontFamily:"'Orbitron',monospace"}}>
                <span>TOTAL</span><span>${(total+subtotal*.08).toFixed(2)}</span>
              </div>
              {shipping > 0 && <div style={{background:"rgba(0,229,255,.07)",border:"1px solid rgba(0,229,255,.2)",borderRadius:8,padding:"10px 14px",fontSize:12,color:"#00e5ff",marginBottom:16}}>
                Add ${(75-subtotal).toFixed(2)} more for free shipping!
              </div>}
              <button onClick={() => onNav("checkout")} style={{width:"100%",background:"linear-gradient(135deg,#00e5ff,#0080ff)",border:"none",color:"#000",fontFamily:"'Orbitron',monospace",fontSize:11,fontWeight:700,letterSpacing:2,padding:14,borderRadius:8,cursor:"pointer",marginBottom:10}}>
                PROCEED TO CHECKOUT
              </button>
              <button onClick={() => onNav("shop")} style={{width:"100%",background:"transparent",border:"1px solid #1a2640",color:"#64748b",fontFamily:"'Rajdhani',sans-serif",fontSize:13,fontWeight:600,padding:12,borderRadius:8,cursor:"pointer"}}>
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CheckoutPage({ cart, onNav, onPlaceOrder }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name:"", email:"", address:"", city:"", zip:"", country:"US" });
  const [payMethod, setPayMethod] = useState("card");
  const subtotal = cart.reduce((s,i) => s+i.price*i.qty, 0);
  const shipping = subtotal >= 75 ? 0 : 9.99;
  const total = (subtotal + shipping + subtotal*.08).toFixed(2);
  const inputStyle = {background:"#0d1626",border:"1px solid #1a2640",color:"#e2e8f0",borderRadius:8,padding:"11px 15px",fontFamily:"'Rajdhani',sans-serif",fontSize:14,outline:"none",width:"100%"};
  const labelStyle = {fontSize:10,letterSpacing:2,color:"#64748b",textTransform:"uppercase",marginBottom:5,display:"block",fontFamily:"'Orbitron',monospace"};

  return (
    <div>
      <div style={{padding:"52px 0 36px",borderBottom:"1px solid #1a2640"}}>
        <div className="container" style={{padding:"0 16px"}}>
          <h1 style={{fontFamily:"'Orbitron',monospace",color:"#fff"}}>CHECKOUT</h1>
        </div>
      </div>
      <div className="container" style={{padding:"36px 16px 72px"}}>
        {/* Steps */}
        <div style={{display:"flex",alignItems:"center",marginBottom:36}}>
          {["Shipping","Payment","Review"].map((lbl,i) => (
            <div key={lbl} style={{display:"flex",alignItems:"center",flex:1}}>
              <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:7}}>
                <div style={{width:38,height:38,borderRadius:"50%",border:`2px solid ${step>i+1?"#00e5ff":step===i+1?"#00e5ff":"#1a2640"}`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Orbitron',monospace",fontSize:12,color:step>i+1?"#000":step===i+1?"#00e5ff":"#64748b",background:step>i+1?"#00e5ff":"#070b14",boxShadow:step===i+1?"0 0 16px rgba(0,229,255,.3)":"none"}}>
                  {step>i+1?"✓":i+1}
                </div>
                <span style={{fontSize:10,color:step===i+1?"#00e5ff":"#64748b",letterSpacing:1,textTransform:"uppercase",fontFamily:"'Orbitron',monospace"}}>{lbl}</span>
              </div>
              {i < 2 && <div style={{flex:1,height:1,background:"#1a2640",margin:"0 6px",marginBottom:22}} />}
            </div>
          ))}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 320px",gap:32,alignItems:"start"}}>
          <div style={{background:"rgba(13,22,38,.95)",border:"1px solid #1a2640",borderRadius:12,padding:28}}>
            {step === 1 && (
              <div>
                <div style={{fontFamily:"'Orbitron',monospace",fontSize:11,color:"#00e5ff",letterSpacing:2,marginBottom:20}}>SHIPPING INFORMATION</div>
                <div style={{display:"grid",gap:16}}>
                  {[["Full Name","name","text","John Doe"],["Email","email","email","you@email.com"],["Address","address","text","123 Main St"],["City","city","text","New York"],["ZIP Code","zip","text","10001"]].map(([lbl,key,type,ph]) => (
                    <div key={key}>
                      <label style={labelStyle}>{lbl}</label>
                      <input style={inputStyle} type={type} placeholder={ph} value={form[key]} onChange={e => setForm(f=>({...f,[key]:e.target.value}))} />
                    </div>
                  ))}
                  <div>
                    <label style={labelStyle}>Country</label>
                    <select style={inputStyle} value={form.country} onChange={e => setForm(f=>({...f,country:e.target.value}))}>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="GB">United Kingdom</option>
                      <option value="AU">Australia</option>
                    </select>
                  </div>
                </div>
                <button onClick={() => setStep(2)} style={{background:"linear-gradient(135deg,#00e5ff,#0080ff)",border:"none",color:"#000",fontFamily:"'Orbitron',monospace",fontSize:11,fontWeight:700,letterSpacing:2,padding:"12px 28px",borderRadius:8,cursor:"pointer",marginTop:24}}>
                  CONTINUE TO PAYMENT →
                </button>
              </div>
            )}
            {step === 2 && (
              <div>
                <div style={{fontFamily:"'Orbitron',monospace",fontSize:11,color:"#00e5ff",letterSpacing:2,marginBottom:20}}>PAYMENT METHOD</div>
                {[["card","💳","Credit / Debit Card"],["paypal","🅿️","PayPal"],["crypto","₿","Cryptocurrency"]].map(([id,ic,lbl]) => (
                  <div key={id} onClick={() => setPayMethod(id)} style={{border:`1px solid ${payMethod===id?"#00e5ff":"#1a2640"}`,borderRadius:10,padding:14,cursor:"pointer",transition:"all .2s",display:"flex",alignItems:"center",gap:11,marginBottom:8,background:payMethod===id?"rgba(0,229,255,.05)":"transparent"}}>
                    <span style={{fontSize:"1.4rem"}}>{ic}</span>
                    <span style={{fontWeight:600}}>{lbl}</span>
                    {payMethod===id && <span style={{marginLeft:"auto",color:"#00e5ff",fontSize:12}}>✓ Selected</span>}
                  </div>
                ))}
                {payMethod === "card" && (
                  <div style={{marginTop:20,display:"grid",gap:14}}>
                    <div><label style={labelStyle}>Card Number</label><input style={inputStyle} placeholder="1234 5678 9012 3456" /></div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
                      <div><label style={labelStyle}>Expiry</label><input style={inputStyle} placeholder="MM/YY" /></div>
                      <div><label style={labelStyle}>CVV</label><input style={inputStyle} placeholder="123" /></div>
                    </div>
                  </div>
                )}
                <div style={{display:"flex",gap:12,marginTop:24}}>
                  <button onClick={() => setStep(1)} style={{background:"transparent",border:"1px solid #1a2640",color:"#64748b",fontFamily:"'Orbitron',monospace",fontSize:11,fontWeight:700,letterSpacing:2,padding:"12px 20px",borderRadius:8,cursor:"pointer"}}>← BACK</button>
                  <button onClick={() => setStep(3)} style={{background:"linear-gradient(135deg,#00e5ff,#0080ff)",border:"none",color:"#000",fontFamily:"'Orbitron',monospace",fontSize:11,fontWeight:700,letterSpacing:2,padding:"12px 28px",borderRadius:8,cursor:"pointer"}}>REVIEW ORDER →</button>
                </div>
              </div>
            )}
            {step === 3 && (
              <div>
                <div style={{fontFamily:"'Orbitron',monospace",fontSize:11,color:"#00e5ff",letterSpacing:2,marginBottom:20}}>REVIEW ORDER</div>
                {cart.map(item => (
                  <div key={item.id} style={{display:"flex",gap:12,padding:"10px 0",borderBottom:"1px solid #1a2640",alignItems:"center"}}>
                    <img src={item.img} alt={item.name} style={{width:52,height:38,objectFit:"cover",borderRadius:6,border:"1px solid #1a2640"}} />
                    <div style={{flex:1}}>
                      <div style={{fontSize:12,fontWeight:600}}>{item.name}</div>
                      <div style={{fontSize:11,color:"#64748b"}}>Qty: {item.qty}</div>
                    </div>
                    <div style={{fontFamily:"'Orbitron',monospace",fontSize:12,color:"#00e5ff"}}>${(item.price*item.qty).toFixed(2)}</div>
                  </div>
                ))}
                <div style={{marginTop:20,padding:16,background:"rgba(0,229,255,.04)",border:"1px solid #1a2640",borderRadius:8,fontSize:13}}>
                  <div style={{color:"#64748b",marginBottom:6}}>Shipping to: <span style={{color:"#e2e8f0"}}>{form.name || "—"}, {form.address || "—"}, {form.city}</span></div>
                  <div style={{color:"#64748b"}}>Payment: <span style={{color:"#e2e8f0"}}>{payMethod==="card"?"Credit Card":payMethod==="paypal"?"PayPal":"Crypto"}</span></div>
                </div>
                <div style={{display:"flex",gap:12,marginTop:24}}>
                  <button onClick={() => setStep(2)} style={{background:"transparent",border:"1px solid #1a2640",color:"#64748b",fontFamily:"'Orbitron',monospace",fontSize:11,fontWeight:700,letterSpacing:2,padding:"12px 20px",borderRadius:8,cursor:"pointer"}}>← BACK</button>
                  <button onClick={onPlaceOrder} style={{background:"linear-gradient(135deg,#ff6b35,#ff3d00)",border:"none",color:"#fff",fontFamily:"'Orbitron',monospace",fontSize:11,fontWeight:700,letterSpacing:2,padding:"12px 28px",borderRadius:8,cursor:"pointer"}}>PLACE ORDER ✓</button>
                </div>
              </div>
            )}
          </div>
          {/* Summary sidebar */}
          <div style={{background:"rgba(13,22,38,.95)",border:"1px solid #1a2640",borderRadius:12,padding:22,position:"sticky",top:80}}>
            <div style={{fontFamily:"'Orbitron',monospace",fontSize:10,letterSpacing:2,color:"#00e5ff",marginBottom:16}}>ORDER SUMMARY</div>
            {[["Subtotal",`$${subtotal.toFixed(2)}`],["Shipping",shipping===0?"FREE":`$${shipping.toFixed(2)}`],["Tax",`$${(subtotal*.08).toFixed(2)}`]].map(([k,v])=>(
              <div key={k} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #1a2640",fontSize:13}}>
                <span style={{color:"#64748b"}}>{k}</span><span>{v}</span>
              </div>
            ))}
            <div style={{display:"flex",justifyContent:"space-between",padding:"12px 0",fontFamily:"'Orbitron',monospace",fontSize:16,fontWeight:700,color:"#00e5ff"}}>
              <span>TOTAL</span><span>${total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function DealsPage({ onNav, cart, wishlist, onAddToCart, onToggleWish, onToast }) {
  const deals = PRODUCTS.filter(p => p.orig);
  return (
    <div>
      <div style={{padding:"52px 0 36px",borderBottom:"1px solid #1a2640"}}>
        <div className="container" style={{padding:"0 16px"}}>
          <div style={{display:"flex",gap:7,fontSize:12,color:"#64748b",marginBottom:20,alignItems:"center"}}>
            <span style={{cursor:"pointer"}} onClick={() => onNav("home")}>Home</span><span>/</span><span>Deals</span>
          </div>
          <h1 style={{fontFamily:"'Orbitron',monospace",color:"#fff",marginBottom:12}}>DEALS & OFFERS</h1>
          <div style={{display:"flex",alignItems:"center",gap:12,flexWrap:"wrap"}}>
            <span style={{color:"#64748b",fontSize:13}}>Flash sale ends in:</span>
            <Countdown endTime={Date.now() + 5*3600000 + 23*60000} />
          </div>
        </div>
      </div>
      <div className="container" style={{padding:"36px 16px 72px"}}>
        <div style={{background:"linear-gradient(135deg,rgba(255,107,53,.1),rgba(0,229,255,.05))",border:"1px solid rgba(255,107,53,.3)",borderRadius:12,padding:"22px 28px",marginBottom:36,display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:14}}>
          <div>
            <div style={{fontFamily:"'Orbitron',monospace",fontSize:"1.2rem",fontWeight:700,color:"#fff"}}>FREE SHIPPING</div>
            <div style={{color:"#64748b",fontSize:13}}>On all orders over $75 — use code <strong style={{color:"#ff6b35"}}>SHIP75</strong></div>
          </div>
          <span onClick={() => onToast("Code SHIP75 copied!","success")} style={{background:"#ff6b35",color:"#fff",fontFamily:"'Orbitron',monospace",fontSize:13,fontWeight:700,padding:"7px 18px",borderRadius:8,cursor:"pointer"}}>SHIP75</span>
        </div>
        <div style={{marginBottom:28}}>
          <span style={{fontSize:10,letterSpacing:4,color:"#00e5ff",textTransform:"uppercase",display:"block",marginBottom:7}}>Limited Time</span>
          <h2 style={{fontFamily:"'Orbitron',monospace",fontSize:"clamp(1.4rem,3vw,2rem)",color:"#fff"}}>ON SALE NOW</h2>
          <div style={{width:56,height:2,background:"linear-gradient(90deg,#00e5ff,transparent)",marginTop:10}} />
        </div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:20}}>
          {deals.map(p => <ProductCard key={p.id} p={p} onNav={onNav} cart={cart} wishlist={wishlist} onAddToCart={onAddToCart} onToggleWish={onToggleWish} />)}
        </div>
      </div>
    </div>
  );
}

function WishlistPage({ wishlist, onNav, onAddToCart, onToggleWish }) {
  return (
    <div>
      <div style={{padding:"52px 0 36px",borderBottom:"1px solid #1a2640"}}>
        <div className="container" style={{padding:"0 16px"}}>
          <div style={{display:"flex",gap:7,fontSize:12,color:"#64748b",marginBottom:20,alignItems:"center"}}>
            <span style={{cursor:"pointer"}} onClick={() => onNav("home")}>Home</span><span>/</span><span>Wishlist</span>
          </div>
          <h1 style={{fontFamily:"'Orbitron',monospace",color:"#fff"}}>MY WISHLIST</h1>
          <p style={{color:"#64748b",fontSize:13,marginTop:6}}>{wishlist.length} saved items</p>
        </div>
      </div>
      <div className="container" style={{padding:"36px 16px 72px"}}>
        {wishlist.length === 0 ? (
          <div style={{textAlign:"center",padding:"72px 0"}}>
            <div style={{fontSize:"3rem",marginBottom:16}}>♡</div>
            <h2 style={{fontFamily:"'Orbitron',monospace",color:"#fff",marginBottom:12}}>YOUR WISHLIST IS EMPTY</h2>
            <p style={{color:"#64748b",marginBottom:28}}>Save items you love to your wishlist.</p>
            <button onClick={() => onNav("shop")} style={{background:"linear-gradient(135deg,#00e5ff,#0080ff)",border:"none",color:"#000",fontFamily:"'Orbitron',monospace",fontSize:11,fontWeight:700,letterSpacing:2,padding:"12px 28px",borderRadius:8,cursor:"pointer"}}>BROWSE PRODUCTS</button>
          </div>
        ) : (
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:20}}>
            {wishlist.map(p => <ProductCard key={p.id} p={p} onNav={onNav} cart={[]} wishlist={wishlist} onAddToCart={onAddToCart} onToggleWish={onToggleWish} />)}
          </div>
        )}
      </div>
    </div>
  );
}

function SearchPage({ onNav, cart, wishlist, onAddToCart, onToggleWish }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const runSearch = () => {
    if (!query.trim()) return;
    const q = query.toLowerCase();
    setResults(PRODUCTS.filter(p => p.name.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q)));
    setSearched(true);
  };
  return (
    <div>
      <div style={{padding:"52px 0 36px",borderBottom:"1px solid #1a2640"}}>
        <div className="container" style={{padding:"0 16px"}}>
          <h1 style={{fontFamily:"'Orbitron',monospace",color:"#fff",marginBottom:14}}>SEARCH</h1>
          <div style={{display:"flex",maxWidth:560}}>
            <input value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => e.key==="Enter" && runSearch()}
              placeholder="Search products..." style={{background:"#0d1626",border:"1px solid #1a2640",color:"#e2e8f0",borderRadius:"8px 0 0 8px",padding:"11px 15px",fontFamily:"'Rajdhani',sans-serif",fontSize:14,outline:"none",flex:1}} />
            <button onClick={runSearch} style={{background:"linear-gradient(135deg,#00e5ff,#0080ff)",border:"none",color:"#000",fontFamily:"'Orbitron',monospace",fontSize:11,fontWeight:700,letterSpacing:2,padding:"0 20px",borderRadius:"0 8px 8px 0",cursor:"pointer"}}>
              🔍 SEARCH
            </button>
          </div>
        </div>
      </div>
      <div className="container" style={{padding:"36px 16px 72px"}}>
        {!searched ? (
          <div>
            <p style={{color:"#64748b",marginBottom:16}}>Popular searches:</p>
            <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
              {["Running Shoes","Wireless Headphones","Yoga Mat","Skincare Serum","Board Games"].map(tag => (
                <span key={tag} onClick={() => { setQuery(tag); setTimeout(runSearch,0); }} style={{background:"#0d1626",border:"1px solid #1a2640",color:"#64748b",padding:"4px 11px",borderRadius:20,fontSize:11,cursor:"pointer",transition:"all .2s"}}>{tag}</span>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <p style={{color:"#64748b",marginBottom:24}}>{results.length} results for "{query}"</p>
            {results.length === 0 ? (
              <div style={{textAlign:"center",padding:"48px 0"}}>
                <p style={{color:"#64748b",fontSize:"1.1rem"}}>No products found. Try a different search term.</p>
              </div>
            ) : (
              <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:20}}>
                {results.map(p => <ProductCard key={p.id} p={p} onNav={onNav} cart={cart} wishlist={wishlist} onAddToCart={onAddToCart} onToggleWish={onToggleWish} />)}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function BlogPage({ onNav }) {
  return (
    <div>
      <div style={{padding:"52px 0 36px",borderBottom:"1px solid #1a2640"}}>
        <div className="container" style={{padding:"0 16px"}}>
          <div style={{display:"flex",gap:7,fontSize:12,color:"#64748b",marginBottom:20,alignItems:"center"}}>
            <span style={{cursor:"pointer"}} onClick={() => onNav("home")}>Home</span><span>/</span><span>Blog</span>
          </div>
          <h1 style={{fontFamily:"'Orbitron',monospace",color:"#fff"}}>TECH BLOG</h1>
          <p style={{color:"#64748b",fontSize:13,marginTop:6}}>Buying guides, reviews, and tech insights</p>
        </div>
      </div>
      <div className="container" style={{padding:"36px 16px 72px"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))",gap:24}}>
          {BLOG_POSTS.map(post => (
            <div key={post.id} style={{background:"rgba(13,22,38,.95)",border:"1px solid #1a2640",borderRadius:12,overflow:"hidden",cursor:"pointer",transition:"all .3s"}}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="#00e5ff";e.currentTarget.style.transform="translateY(-4px)";}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="#1a2640";e.currentTarget.style.transform="";}}>
              <img src={post.img} alt={post.title} style={{width:"100%",height:180,objectFit:"cover"}} />
              <div style={{padding:20}}>
                <div style={{display:"flex",gap:12,marginBottom:12,fontSize:11,color:"#64748b"}}>
                  <span style={{color:"#00e5ff"}}>{post.cat}</span>
                  <span>{post.date}</span>
                  <span>{post.read} read</span>
                </div>
                <h3 style={{fontFamily:"'Orbitron',monospace",fontSize:14,color:"#fff",marginBottom:10,lineHeight:1.4}}>{post.title}</h3>
                <p style={{color:"#64748b",fontSize:13,lineHeight:1.6}}>{post.excerpt}</p>
                <div style={{marginTop:16,color:"#00e5ff",fontSize:12,fontFamily:"'Orbitron',monospace",letterSpacing:1}}>READ MORE →</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SupportPage({ onNav, onToast }) {
  const [openFaq, setOpenFaq] = useState(null);
  const [form, setForm] = useState({ name:"", email:"", orderId:"", subject:"Order Issue", message:"" });
  const inputStyle = {background:"#0d1626",border:"1px solid #1a2640",color:"#e2e8f0",borderRadius:8,padding:"11px 15px",fontFamily:"'Rajdhani',sans-serif",fontSize:14,outline:"none",width:"100%"};
  const labelStyle = {fontSize:10,letterSpacing:2,color:"#64748b",textTransform:"uppercase",marginBottom:5,display:"block",fontFamily:"'Orbitron',monospace"};
  return (
    <div>
      <div style={{padding:"52px 0 36px",borderBottom:"1px solid #1a2640"}}>
        <div className="container" style={{padding:"0 16px"}}>
          <div style={{display:"flex",gap:7,fontSize:12,color:"#64748b",marginBottom:20,alignItems:"center"}}>
            <span style={{cursor:"pointer"}} onClick={() => onNav("home")}>Home</span><span>/</span><span>Support</span>
          </div>
          <h1 style={{fontFamily:"'Orbitron',monospace",color:"#fff"}}>HELP CENTER</h1>
          <p style={{color:"#64748b",fontSize:13,marginTop:6}}>Get answers to your questions</p>
        </div>
      </div>
      <div className="container" style={{padding:"36px 16px 72px"}}>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))",gap:16,marginBottom:48}}>
          {[["💬","Live Chat","Available 24/7 — avg. 2 min response","#00e5ff"],["✉️","Email Support","support@shopshopie.com","#a855f7"],["📞","Phone","1-800-SHOPSHOP (Mon–Fri 9–6 EST)","#ff6b35"]].map(([ic,t,s,c]) => (
            <div key={t} onClick={() => onToast(`Connecting to ${t}...`,"info")} style={{background:"rgba(13,22,38,.95)",border:"1px solid #1a2640",borderRadius:12,padding:22,textAlign:"center",cursor:"pointer",transition:"all .3s"}}
              onMouseEnter={e=>e.currentTarget.style.borderColor=c}
              onMouseLeave={e=>e.currentTarget.style.borderColor="#1a2640"}>
              <span style={{fontSize:"1.9rem",display:"block",marginBottom:10}}>{ic}</span>
              <div style={{fontFamily:"'Orbitron',monospace",fontSize:12,fontWeight:700,color:"#fff",marginBottom:3}}>{t}</div>
              <div style={{fontSize:12,color:"#64748b"}}>{s}</div>
            </div>
          ))}
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:32,alignItems:"start"}}>
          <div>
            <h2 style={{fontFamily:"'Orbitron',monospace",fontSize:"1.1rem",color:"#fff",marginBottom:22}}>FREQUENTLY ASKED QUESTIONS</h2>
            {FAQS.map((faq,i) => (
              <div key={i} style={{border:"1px solid #1a2640",borderRadius:8,marginBottom:7,overflow:"hidden"}}>
                <div onClick={() => setOpenFaq(openFaq===i?null:i)} style={{padding:"14px 18px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",background:"rgba(13,22,38,.95)",userSelect:"none"}}>
                  <span style={{fontWeight:600,fontSize:13}}>{faq.q}</span>
                  <span style={{color:"#00e5ff",transition:"transform .2s",display:"inline-block",transform:openFaq===i?"rotate(180deg)":"none"}}>▼</span>
                </div>
                {openFaq === i && <div style={{padding:"14px 18px",background:"rgba(0,229,255,.03)",fontSize:13,color:"#64748b",lineHeight:1.8,borderTop:"1px solid #1a2640"}}>{faq.a}</div>}
              </div>
            ))}
          </div>
          <div style={{background:"rgba(13,22,38,.95)",border:"1px solid #1a2640",borderRadius:12,padding:22}}>
            <div style={{fontSize:12,fontWeight:700,letterSpacing:2,color:"#00e5ff",textTransform:"uppercase",marginBottom:18,fontFamily:"'Orbitron',monospace"}}>CONTACT US</div>
            <div style={{display:"flex",flexDirection:"column",gap:13}}>
              {[["Your Name","name","text","John Doe"],["Email","email","email","you@email.com"],["Order ID (optional)","orderId","text","SS12345678"]].map(([lbl,key,type,ph]) => (
                <div key={key}>
                  <label style={labelStyle}>{lbl}</label>
                  <input style={inputStyle} type={type} placeholder={ph} value={form[key]} onChange={e => setForm(f=>({...f,[key]:e.target.value}))} />
                </div>
              ))}
              <div>
                <label style={labelStyle}>Subject</label>
                <select style={inputStyle} value={form.subject} onChange={e => setForm(f=>({...f,subject:e.target.value}))}>
                  {["Order Issue","Return Request","Product Question","Technical Support","Billing","Other"].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Message</label>
                <textarea style={{...inputStyle,resize:"vertical"}} rows={4} placeholder="Describe your issue..." value={form.message} onChange={e => setForm(f=>({...f,message:e.target.value}))} />
              </div>
            </div>
            <button onClick={() => { if(!form.name||!form.email||!form.message){onToast("Please fill Name, Email, and Message","error");return;} onToast("Message sent! We'll reply within 24 hours.","success"); setForm({name:"",email:"",orderId:"",subject:"Order Issue",message:""}); }}
              style={{width:"100%",background:"linear-gradient(135deg,#00e5ff,#0080ff)",border:"none",color:"#000",fontFamily:"'Orbitron',monospace",fontSize:10,fontWeight:700,letterSpacing:2,padding:14,borderRadius:8,cursor:"pointer",marginTop:16}}>
              ✉ SEND MESSAGE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AccountPage({ onNav }) {
  return (
    <div>
      <div style={{padding:"52px 0 36px",borderBottom:"1px solid #1a2640"}}>
        <div className="container" style={{padding:"0 16px"}}>
          <h1 style={{fontFamily:"'Orbitron',monospace",color:"#fff"}}>MY ACCOUNT</h1>
        </div>
      </div>
      <div className="container" style={{padding:"36px 16px 72px",textAlign:"center"}}>
        <div style={{maxWidth:400,margin:"0 auto"}}>
          <div style={{fontSize:"3rem",marginBottom:16}}>👤</div>
          <h2 style={{fontFamily:"'Orbitron',monospace",color:"#fff",marginBottom:12}}>SIGN IN TO YOUR ACCOUNT</h2>
          <p style={{color:"#64748b",marginBottom:28}}>Access your orders, wishlist, and profile settings.</p>
          <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
            <button style={{background:"linear-gradient(135deg,#00e5ff,#0080ff)",border:"none",color:"#000",fontFamily:"'Orbitron',monospace",fontSize:11,fontWeight:700,letterSpacing:2,padding:"12px 28px",borderRadius:8,cursor:"pointer"}}>SIGN IN</button>
            <button style={{background:"transparent",border:"1px solid #00e5ff",color:"#00e5ff",fontFamily:"'Orbitron',monospace",fontSize:11,fontWeight:700,letterSpacing:2,padding:"12px 28px",borderRadius:8,cursor:"pointer"}}>REGISTER</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderConfirmPage({ onNav, orderId }) {
  return (
    <div style={{minHeight:"80vh",display:"flex",alignItems:"center",justifyContent:"center",padding:"40px 20px"}}>
      <div style={{maxWidth:540,width:"100%",textAlign:"center"}}>
        <div style={{width:76,height:76,borderRadius:"50%",background:"rgba(34,197,94,.15)",border:"2px solid #22c55e",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"2.2rem",margin:"0 auto 22px",color:"#22c55e"}}>✓</div>
        <div style={{display:"inline-block",background:"rgba(0,229,255,.1)",border:"1px solid rgba(0,229,255,.3)",color:"#00e5ff",fontSize:10,letterSpacing:3,padding:"6px 16px",borderRadius:4,marginBottom:16,fontFamily:"'Orbitron',monospace"}}>ORDER CONFIRMED</div>
        <h1 style={{fontFamily:"'Orbitron',monospace",fontSize:"clamp(1.4rem,4vw,1.9rem)",color:"#fff",marginBottom:10}}>THANK YOU!</h1>
        <p style={{color:"#64748b",marginBottom:28}}>Your order #{orderId} has been placed. A confirmation email has been sent.</p>
        <div style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
          <button onClick={() => onNav("account")} style={{background:"linear-gradient(135deg,#00e5ff,#0080ff)",border:"none",color:"#000",fontFamily:"'Orbitron',monospace",fontSize:11,fontWeight:700,letterSpacing:2,padding:"12px 24px",borderRadius:8,cursor:"pointer"}}>📦 VIEW ORDERS</button>
          <button onClick={() => onNav("shop")} style={{background:"transparent",border:"1px solid #00e5ff",color:"#00e5ff",fontFamily:"'Orbitron',monospace",fontSize:11,fontWeight:700,letterSpacing:2,padding:"12px 24px",borderRadius:8,cursor:"pointer"}}>CONTINUE SHOPPING</button>
        </div>
      </div>
    </div>
  );
}

// ==================== MAIN APP ====================
export default function ShopShopie() {
  const [page, setPage] = useState("home");
  const [pageData, setPageData] = useState({});
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem("ss_cart")||"[]"); } catch { return []; }
  });
  const [wishlist, setWishlist] = useState(() => {
    try { return JSON.parse(localStorage.getItem("ss_wl")||"[]"); } catch { return []; }
  });
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const toastTimer = useRef(null);

  useEffect(() => { setTimeout(() => setLoading(false), 900); }, []);
  useEffect(() => { try { localStorage.setItem("ss_cart", JSON.stringify(cart)); } catch {} }, [cart]);
  useEffect(() => { try { localStorage.setItem("ss_wl", JSON.stringify(wishlist)); } catch {} }, [wishlist]);

  const showToast = useCallback((msg, type="success") => {
    setToast({ msg, type });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3500);
  }, []);

  const onNav = (pageName, productId=null, category=null) => {
    setPage(pageName);
    setPageData({ productId, category });
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addToCart = (id, qty=1) => {
    const p = PRODUCTS.find(x => x.id === id);
    if (!p) return;
    setCart(c => {
      const ex = c.find(i => i.id === id);
      if (ex) return c.map(i => i.id===id ? {...i, qty: i.qty+qty} : i);
      return [...c, {...p, qty}];
    });
    showToast(p.name.split(" ").slice(0,3).join(" ") + " added to cart!", "success");
  };

  const removeFromCart = (id) => setCart(c => c.filter(i => i.id !== id));
  const updateQty = (id, qty) => {
    if (qty < 1) { removeFromCart(id); return; }
    setCart(c => c.map(i => i.id===id ? {...i, qty} : i));
  };

  const toggleWish = (id) => {
    const p = PRODUCTS.find(x => x.id === id);
    if (!p) return;
    setWishlist(w => {
      const has = w.some(i => i.id === id);
      if (has) { showToast("Removed from wishlist", "info"); return w.filter(i => i.id !== id); }
      showToast("Added to wishlist!", "success"); return [...w, p];
    });
  };

  const placeOrder = () => {
    const oid = "SS" + Date.now().toString().slice(-8);
    setOrderId(oid);
    setCart([]);
    onNav("order-confirm");
    showToast("Order placed successfully!", "success");
  };

  const cartCount = cart.reduce((s,i) => s+i.qty, 0);

  const navLinks = [
    { id:"home", label:"HOME" },
    { id:"shop", label:"SHOP" },
    { id:"deals", label:"DEALS" },
    { id:"categories", label:"CATEGORIES" },
    { id:"blog", label:"BLOG" },
  ];

  const navBtn = (active) => ({
    background:"none", border:"none",
    color: active ? "#00e5ff" : "#94a3b8",
    fontFamily:"'Rajdhani',sans-serif", fontWeight:600,
    letterSpacing:1, fontSize:14, padding:"8px 12px",
    cursor:"pointer", transition:"color .2s",
  });

  const iconBtn = (active=false) => ({
    background:"transparent", border:`1px solid ${active?"#00e5ff":"#1a2640"}`,
    color: active ? "#00e5ff" : "#e2e8f0",
    borderRadius:8, padding:"8px 12px", cursor:"pointer",
    position:"relative", transition:"all .2s",
    display:"inline-flex", alignItems:"center", gap:6, fontSize:14,
  });

  if (loading) return (
    <div style={{position:"fixed",inset:0,background:"#070b14",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",zIndex:9999}}>
      <div style={{fontFamily:"'Orbitron',monospace",fontSize:"1.5rem",fontWeight:900,color:"#fff",letterSpacing:4,marginBottom:20}}>
        SHOP<span style={{color:"#00e5ff"}}>SHOPIE</span>
      </div>
      <div style={{display:"flex",gap:6}}>
        {[0,1,2].map(i => (
          <div key={i} style={{width:8,height:8,borderRadius:"50%",background:"#00e5ff",animation:`loadDot .9s ${i*.2}s infinite alternate`}} />
        ))}
      </div>
      <style>{`@keyframes loadDot{from{opacity:.2;transform:scale(.8)}to{opacity:1;transform:scale(1)}}@keyframes slideIn{from{transform:translateX(100px);opacity:0}to{transform:translateX(0);opacity:1}}`}</style>
    </div>
  );

  return (
    <div style={{background:"#070b14",color:"#e2e8f0",minHeight:"100vh",fontFamily:"'Rajdhani',sans-serif"}}>
      <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@300;400;600;700&display=swap" rel="stylesheet" />
      <style>{`*{box-sizing:border-box;margin:0;padding:0}body{overflow-x:hidden}::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:#0a0f1e}::-webkit-scrollbar-thumb{background:#00e5ff;border-radius:3px}@keyframes slideIn{from{transform:translateX(100px);opacity:0}to{transform:translateX(0);opacity:1}}@keyframes scrollPromo{from{transform:translateX(0)}to{transform:translateX(-50%)}}.container{max-width:1200px;margin:0 auto}@media(max-width:768px){.desktop-nav{display:none!important}}`}</style>

      {/* Promo Banner */}
      <div style={{background:"linear-gradient(90deg,#0a0f1e,rgba(0,229,255,.06),#0a0f1e)",borderBottom:"1px solid #1a2640",padding:"10px 0",overflow:"hidden"}}>
        <div style={{display:"flex",gap:64,whiteSpace:"nowrap",animation:"scrollPromo 22s linear infinite"}}>
          {["⚡ FREE SHIPPING ON ORDERS $75+","🛡 2-YEAR WARRANTY ON ALL PRODUCTS","↩ 30-DAY HASSLE-FREE RETURNS","🏷 USE CODE SHIP75 FOR FREE SHIPPING","⭐ 50,000+ HAPPY CUSTOMERS","⚡ FREE SHIPPING ON ORDERS $75+","🛡 2-YEAR WARRANTY ON ALL PRODUCTS","↩ 30-DAY HASSLE-FREE RETURNS","🏷 USE CODE SHIP75 FOR FREE SHIPPING","⭐ 50,000+ HAPPY CUSTOMERS"].map((item, i) => (
            <span key={i} style={{fontFamily:"'Orbitron',monospace",fontSize:10,letterSpacing:2,color:"#00e5ff",display:"inline-flex",alignItems:"center",gap:10}}>{item}</span>
          ))}
        </div>
      </div>

      {/* Navbar */}
      <nav style={{background:"rgba(7,11,20,.97)",borderBottom:"1px solid #1a2640",padding:"12px 0",position:"sticky",top:0,zIndex:1000,backdropFilter:"blur(20px)"}}>
        <div className="container" style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:12,padding:"0 16px"}}>
          <div onClick={() => onNav("home")} style={{fontFamily:"'Orbitron',monospace",fontSize:"1.3rem",fontWeight:900,color:"#fff",letterSpacing:3,cursor:"pointer",userSelect:"none"}}>
            SHOP<span style={{color:"#00e5ff"}}>SHOPIE</span>
          </div>
          <div className="desktop-nav" style={{display:"flex",alignItems:"center",gap:4}}>
            {navLinks.map(l => (
              <button key={l.id} onClick={() => onNav(l.id)} style={navBtn(page===l.id)}>{l.label}</button>
            ))}
          </div>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <button onClick={() => onNav("search")} style={iconBtn(page==="search")}>🔍</button>
            <button onClick={() => onNav("wishlist")} style={iconBtn(page==="wishlist")}>
              ♡
              {wishlist.length > 0 && <span style={{position:"absolute",top:-6,right:-6,background:"#00e5ff",color:"#070b14",fontSize:10,fontWeight:700,borderRadius:"50%",width:18,height:18,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Orbitron',monospace"}}>{wishlist.length}</span>}
            </button>
            <button onClick={() => onNav("cart")} style={iconBtn(page==="cart")}>
              🛒
              {cartCount > 0 && <span style={{position:"absolute",top:-6,right:-6,background:"#00e5ff",color:"#070b14",fontSize:10,fontWeight:700,borderRadius:"50%",width:18,height:18,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:"'Orbitron',monospace"}}>{cartCount}</span>}
            </button>
            <button onClick={() => onNav("account")} style={iconBtn(page==="account")}>👤 Login</button>
            <button onClick={() => setMobileMenuOpen(o=>!o)} style={{...iconBtn(),display:"none"}} className="mobile-hamburger">☰</button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div style={{position:"fixed",inset:0,background:"rgba(7,11,20,.98)",zIndex:2000,display:"flex",flexDirection:"column",padding:"28px 24px",backdropFilter:"blur(20px)"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:32}}>
            <div style={{fontFamily:"'Orbitron',monospace",fontSize:"1.3rem",fontWeight:900,color:"#fff",letterSpacing:3}}>SHOP<span style={{color:"#00e5ff"}}>SHOPIE</span></div>
            <button onClick={() => setMobileMenuOpen(false)} style={{background:"none",border:"none",color:"#e2e8f0",fontSize:"1.5rem",cursor:"pointer"}}>✕</button>
          </div>
          {[...navLinks, {id:"support",label:"SUPPORT"}].map(l => (
            <div key={l.id} onClick={() => onNav(l.id)} style={{color:"#94a3b8",fontFamily:"'Orbitron',monospace",fontWeight:700,fontSize:"1rem",letterSpacing:3,padding:"16px 0",cursor:"pointer",borderBottom:"1px solid #1a2640"}}>{l.label}</div>
          ))}
        </div>
      )}

      {/* Main Content */}
      <main>
        {page === "home" && <HomePage onNav={onNav} cart={cart} wishlist={wishlist} onAddToCart={addToCart} onToggleWish={toggleWish} />}
        {page === "shop" && <ShopPage onNav={onNav} cart={cart} wishlist={wishlist} onAddToCart={addToCart} onToggleWish={toggleWish} initialCategory={pageData.category} />}
        {page === "product" && <ProductPage productId={pageData.productId} onNav={onNav} onAddToCart={addToCart} onToggleWish={toggleWish} wishlist={wishlist} />}
        {page === "cart" && <CartPage cart={cart} onNav={onNav} onRemove={removeFromCart} onUpdateQty={updateQty} />}
        {page === "checkout" && <CheckoutPage cart={cart} onNav={onNav} onPlaceOrder={placeOrder} />}
        {page === "deals" && <DealsPage onNav={onNav} cart={cart} wishlist={wishlist} onAddToCart={addToCart} onToggleWish={toggleWish} onToast={showToast} />}
        {page === "wishlist" && <WishlistPage wishlist={wishlist} onNav={onNav} onAddToCart={addToCart} onToggleWish={toggleWish} />}
        {page === "search" && <SearchPage onNav={onNav} cart={cart} wishlist={wishlist} onAddToCart={addToCart} onToggleWish={toggleWish} />}
        {page === "categories" && <ShopPage onNav={onNav} cart={cart} wishlist={wishlist} onAddToCart={addToCart} onToggleWish={toggleWish} />}
        {page === "account" && <AccountPage onNav={onNav} />}
        {page === "blog" && <BlogPage onNav={onNav} />}
        {page === "support" && <SupportPage onNav={onNav} onToast={showToast} />}
        {page === "order-confirm" && <OrderConfirmPage onNav={onNav} orderId={orderId} />}
      </main>

      {/* Footer */}
      <footer style={{background:"#0a0f1e",borderTop:"1px solid #1a2640",padding:"56px 0 28px",marginTop:0}}>
        <div className="container" style={{padding:"0 16px"}}>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))",gap:36,marginBottom:36}}>
            <div>
              <div style={{fontFamily:"'Orbitron',monospace",fontSize:"1.3rem",fontWeight:900,color:"#fff",marginBottom:14}}>SHOP<span style={{color:"#00e5ff"}}>SHOPIE</span></div>
              <p style={{color:"#64748b",fontSize:13,lineHeight:1.7,marginBottom:16}}>Your one-stop shop for fashion, electronics, home, beauty, sports, and more.</p>
              <div style={{display:"flex",gap:12}}>
                {["𝕏","in","▶","📘"].map((ic,i) => <span key={i} style={{color:"#64748b",fontSize:"1.2rem",cursor:"pointer"}}>{ic}</span>)}
              </div>
            </div>
            {[["Products",["Shop","Deals","New Arrivals","Best Sellers"]],["Company",["About","Blog","Careers","Press"]],["Support",["Help Center","Returns","Shipping","Warranty"]],["Account",["My Account","Wishlist","Cart","Login"]]].map(([hdr,links]) => (
              <div key={hdr}>
                <div style={{fontFamily:"'Orbitron',monospace",fontSize:10,letterSpacing:3,color:"#00e5ff",textTransform:"uppercase",marginBottom:18}}>{hdr}</div>
                {links.map(lnk => (
                  <div key={lnk} onClick={() => onNav(lnk.toLowerCase().replace(/[^a-z]/g,""))} style={{color:"#64748b",textDecoration:"none",display:"block",marginBottom:9,fontSize:13,cursor:"pointer",transition:"color .2s"}}
                    onMouseEnter={e=>e.target.style.color="#00e5ff"}
                    onMouseLeave={e=>e.target.style.color="#64748b"}>{lnk}</div>
                ))}
              </div>
            ))}
          </div>
          <div style={{height:1,background:"linear-gradient(90deg,transparent,#00e5ff,transparent)",opacity:.4,margin:"20px 0"}} />
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:12}}>
            <p style={{color:"#64748b",fontSize:12}}>© 2025 ShopShopie. All rights reserved.</p>
            <div style={{display:"flex",gap:8}}>
              {["VISA","PAYPAL","STRIPE"].map(b => (
                <span key={b} style={{background:"#0d1626",border:"1px solid #1a2640",borderRadius:4,padding:"3px 8px",fontSize:10,color:"#64748b",fontFamily:"'Orbitron',monospace"}}>{b}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>

      <Toast toast={toast} />
    </div>
  );
}
