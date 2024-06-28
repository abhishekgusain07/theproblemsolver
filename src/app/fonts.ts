import { Inter, Roboto_Mono, Josefin_Slab, Poppins} from 'next/font/google'
 
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})
 
export const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
})

export const josefin_Slab = Josefin_Slab({
    subsets: ['latin'],
    weight: ['600'],
    style: ['normal', 'italic'],
})

export const poppins = Poppins({
    weight: ['500', '600', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin']
})