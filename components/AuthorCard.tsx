import Image from 'next/image';

interface AuthorCardProps {
  name: string;
  avatar?: string;
  bio?: string;
  variant?: 'inline' | 'card';
}

export default function AuthorCard({ name, avatar, bio, variant = 'inline' }: AuthorCardProps) {
  if (variant === 'card') {
    return (
      <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
        <div className="flex items-center space-x-4 mb-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xl font-bold">
            {avatar ? (
              <Image src={avatar} alt={name} width={64} height={64} className="rounded-full" />
            ) : (
              name.charAt(0).toUpperCase()
            )}
          </div>
          <div>
            <h3 className="font-semibold text-lg text-gray-900">{name}</h3>
            {bio && <p className="text-sm text-gray-600">{bio}</p>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-3">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-medium">
        {avatar ? (
          <Image src={avatar} alt={name} width={40} height={40} className="rounded-full" />
        ) : (
          name.charAt(0).toUpperCase()
        )}
      </div>
      <span className="font-medium text-gray-900">{name}</span>
    </div>
  );
}

