

// components/dashboard/RoleSwitcher.tsx
// export const RoleSwitcher = () => {
//   const { user } = useAuth();
//   const [activeRole, setActiveRole] = useState<'client' | 'professional'>('client');

//   if (user.role !== 'both') return null;

//   return (
//     <div className="flex gap-2">
//       <Button
//         variant={activeRole === 'client' ? 'primary' : 'outline'}
//         onClick={() => setActiveRole('client')}
//       >
//         👨‍💼 Client View
//       </Button>
//       <Button
//         variant={activeRole === 'professional' ? 'primary' : 'outline'}
//         onClick={() => setActiveRole('professional')}
//       >
//         ⚡ Professional View
//       </Button>
//     </div>
//   );
// };