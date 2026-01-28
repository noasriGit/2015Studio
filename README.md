# Velvet Studio - Recording Studio Booking System

A premium, award-winning recording studio website preview with an atmospheric dark velvet + soft neon aesthetic. Built with Next.js, TypeScript, TailwindCSS, and Framer Motion.

## Features

- **Studio Boot Sequence**: Cinematic startup animation with rack unit, LEDs, and waveform
- **Animated Background**: Procedural waveforms, grain overlay, and parallax effects
- **Public Booking Form**: Complete booking system with validation (Zod + React Hook Form)
- **Admin Dashboard**: Password-protected admin interface for managing bookings
- **Visual Calendar**: Weekly calendar view with drag-and-drop booking placement
- **Collision Detection**: Prevents double-booking with time slot conflict checking
- **LocalStorage Persistence**: All data stored client-side (no backend required)
- **Responsive Design**: Premium experience on mobile and desktop

## Tech Stack

- **Next.js 16** (App Router)
- **TypeScript**
- **TailwindCSS v4**
- **Framer Motion** (animations)
- **Zod** (validation)
- **React Hook Form** (form handling)

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── page.tsx              # Landing page
│   ├── book/
│   │   └── page.tsx          # Booking page
│   ├── admin/
│   │   └── page.tsx          # Admin dashboard
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── AnimatedBackground.tsx # Canvas-based animated background
│   ├── BootSequence.tsx      # Studio boot-up animation
│   ├── Navbar.tsx            # Studio-themed navigation
│   ├── BookingForm.tsx       # Booking form with validation
│   ├── Calendar.tsx          # Weekly calendar component
│   └── PendingBookingsList.tsx # Pending bookings display
└── lib/
    ├── types.ts              # TypeScript types
    ├── storage.ts            # LocalStorage utilities
    ├── time.ts               # Time/date utilities
    └── bookingLogic.ts       # Booking collision detection
```

## Admin Access

- **URL**: `/admin`
- **Password**: `studio123` (hardcoded for demo)

The admin dashboard allows you to:
- View pending bookings
- Accept/decline bookings
- Place bookings on the calendar
- Move existing bookings
- Delete bookings
- Generate seed data for testing
- Reset all demo data

## LocalStorage Keys

- `studio_bookings`: Array of all bookings (pending, confirmed, declined)
- `studio_admin_auth`: Boolean flag for admin authentication

## Booking Data Model

```typescript
interface Booking {
  id: string;
  name: string;
  email: string;
  phone?: string;
  sessionType: "Mix" | "Master" | "Recording" | "Podcast";
  room: "A" | "B";
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  durationHours: number; // 1-8
  notes?: string;
  status: "pending" | "confirmed" | "declined";
  scheduled: {
    startISO: string;
    endISO: string;
  } | null;
  createdAtISO: string;
}
```

## Features in Detail

### Boot Sequence
- Animated rack unit with LED indicators
- Waveform line drawing animation
- Skip button for quick access
- Smooth fade-out transition

### Animated Background
- Canvas-based procedural waveforms
- Layered parallax gradients
- Film grain overlay with blend modes
- Performance-optimized animations

### Booking Form
- Full validation with Zod schemas
- Real-time error feedback
- Success animation with confirmation card
- LED-style input focus effects

### Calendar
- Weekly view (Monday-Sunday)
- Time slots: 9am-12am (30-minute intervals)
- Room A and Room B columns
- Color-coded by session type
- Click to place/move bookings
- Visual conflict detection

### Admin Dashboard
- Password-protected access
- Tabbed interface (Pending / Calendar)
- Accept/decline pending bookings
- Visual calendar with booking placement
- Move and delete confirmed bookings
- Seed data generator
- Reset demo data button

## Design Theme

- **Colors**: Dark velvet (#0a050f) with purple/pink neon accents
- **Typography**: Geist Sans + Geist Mono (premium pairing)
- **Effects**: Film grain, chromatic aberration (subtle), ambient breathing motion
- **UI Elements**: Studio hardware-inspired (knobs, switches, transport controls)

## Browser Support

Modern browsers with ES2017+ support. Tested on Chrome, Firefox, Safari, and Edge.

## Performance Optimizations

The site has been optimized for smooth 60fps animations:

- **Canvas Background**: Throttled to ~30fps, reduced point density, GPU-accelerated
- **Framer Motion**: Optimized with `will-change` hints, reduced animation durations, simplified transitions
- **Viewport Animations**: Early trigger with margins, `once: true` to prevent re-animations
- **CSS Effects**: Simplified film grain pattern, removed heavy blend modes
- **GPU Acceleration**: Transform and opacity properties, `translateZ(0)` for hardware acceleration
- **React Memo**: Background component memoized to prevent unnecessary re-renders
- **Reduced Motion**: Respects `prefers-reduced-motion` for accessibility

### Performance Tips

- Canvas animations run at 30fps (sufficient for background)
- Scroll animations trigger early with viewport margins
- All animations use GPU-accelerated properties (transform, opacity)
- Heavy effects (backdrop-blur) removed where possible

## License

This is a demo/mockup project for client presentation.
