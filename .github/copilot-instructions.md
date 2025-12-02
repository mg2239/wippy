# Wippy - AI Coding Agent Instructions

## Architecture Overview

Wippy is a Next.js 13 audio file sharing app with Firebase backend. Users upload audio files with expiration dates; files are stored in Firebase Storage with metadata in Firestore.

**Data Flow:**

1. Upload: `UploadContext` → Firebase Storage → Firestore → Navigate to track page
2. Playback: SSR fetches track from Firestore → Check expiration → Dynamic Player component

## Key Components & Patterns

### Context-Driven Upload Flow

- `UploadContext` (`context/UploadContext.tsx`) manages entire upload lifecycle
- `onUpload()` → generates nanoid → uploads to Storage → saves metadata to Firestore → redirects
- Track URLs are fetched after upload completes via `getDownloadURL()`
- Expiration dates calculated using `spacetime` library (e.g., `now.add(amount, unit)`)

### Dynamic Routing & SSR

- `pages/[id].tsx` uses `getServerSideProps` to fetch tracks server-side
- Timestamp conversion: Firestore `Timestamp` → `toMillis()` for client serialization
- Expired tracks return 404 via `spacetime.now().isAfter(trackData.expiresAt.toDate())`

### Client-Side Player

- `Player` component uses **dynamic import** with `ssr: false` (wavesurfer.js requires DOM)
- Volume persists via `cookies-next`
- Keyboard shortcuts via `tinykeys` (Space = play/pause)
- Time updates throttled to 100ms using `throttle-debounce`

## Development Commands

```bash
npm run dev      # Development server (Next.js)
npm run build    # Production build
npm run lint     # ESLint
```

## File & Naming Conventions

- Components: Index exports in named folders (`components/Player/index.tsx`)
- Pages: Next.js file-based routing (`[id].tsx` for dynamic routes)
- Types: Centralized in `types/index.ts`
- Utils: `util/` for Firebase config and helpers

## Styling & UI

- **Tailwind CSS** utility-first approach
- Custom Tailwind config includes `pages/` and `components/` in content paths
- Prettier with `prettier-plugin-tailwindcss` for class ordering
- `classnames` library for conditional styling

## Firebase Integration

- Config exposed in `util/firebase.ts` (exports `db` and `storage` instances)
- Use modular v9+ SDK imports (`firebase/firestore`, `firebase/storage`)
- Track model: `{ title, createdAt, expiresAt, url }` stored in `tracks` collection
- File storage path: `${nanoid}.${fileType}` (e.g., `abc123.mp3`)

## Critical Libraries

- **wavesurfer.js**: Audio visualization (requires client-side only)
- **react-dropzone**: File uploads via `useUpload` hook wrapper
- **spacetime**: Date/time manipulation for expiration logic
- **nanoid**: Short unique IDs for track URLs

## TypeScript Specifics

- Strict mode enabled
- Firestore types require manual mapping (e.g., `Timestamp` to `number`)
- Component props typed inline or via `type Props = { ... }`

## Common Patterns

```tsx
// Dynamic import for client-only components
const Player = dynamic(
  () => import('../components/Player').then((mod) => mod.Player),
  {
    ssr: false,
  }
);

// Context hook usage
const { uploading, progress, onUpload } = useContext(UploadContext);

// Firebase Storage upload with progress
uploadBytesResumable(ref, file).on(
  'state_changed',
  (snapshot) =>
    setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100),
  (error) => console.log(error),
  () => getDownloadURL(ref).then(setDownloadUrl)
);
```

## Known Issues/Quirks

- Landing page has `{!true}` condition (appears intentional for always showing upload form)
- Firebase config is hardcoded (not environment variables)
- No authentication system - tracks accessible via URL only
