import Image from 'next/image';
import Link from 'next/link';

const ExternalLink = ({ href, imagePath, altText}:{
    href: string;
    imagePath: string;
    altText: string
}) => (
  <Link href={href} legacyBehavior>
    <a target="_blank" rel="noopener noreferrer">
    <Image 
            src={imagePath}
            alt={altText}
            width={50}
            height={50}
          />
    </a>
  </Link>
);

export default ExternalLink;
