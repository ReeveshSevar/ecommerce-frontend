export const navigation = {
  categories: [
    {
      id: 'women',
      name: 'Women',
      featured: [
        {
          name: 'New Arrivals',
          href: '/',
          imageSrc: 'https://5.imimg.com/data5/SELLER/Default/2021/7/QO/PK/AZ/133387121/women-western-dresses-500x500.jpg',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
        },
        {
          name: 'Basic Tees',
          href: '/',
          imageSrc: 'https://ambraee.com/cdn/shop/products/78_ff3374f2-7cbd-4004-9df8-93cdbbbecd51.jpg?v=1691223586&width=1080',
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Tops', id: "top", href: `{women/clothing/tops}` },
            { name: 'Women Dress', id: "dress", href: '#' },
            { name: 'Girl Dress', id: 'Dress', href: '#' },
            { name: 'Women Jeans', id: 'jeans' },
            { name: 'Lengha', id: 'lengha' },
            { name: 'Sweaters', id: 'sweater' },
            { name: 'Jackets', id: 'jacket' },
            { name: 'Gouns', id: 'gouns' },
            { name: 'Sarees', id: 'saree' },
            { name: 'Suite', id: 'suite' },
          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', id: 'watch' },
            { name: 'Wallets', id: 'women_wallet' },
            { name: 'Bags', id: 'women_bag' },
            { name: 'Sunglasses', id: 'women_sunglasses' },
            { name: 'Hats', id: 'women_hat' },
            { name: 'Belts', id: 'women_belt' },
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Full Nelson', id: '#' },
            { name: 'My Way', id: '#' },
            { name: 'Re-Arranged', id: '#' },
            { name: 'Counterfeit', id: '#' },
            { name: 'Significant Other', id: '#' },
          ],
        },
      ],
    },
    {
      id: 'men',
      name: 'Men',
      featured: [
        {
          name: 'New Arrivals',
          id: '#',
          imageSrc: 'https://i.etsystatic.com/30129981/r/il/eb5bd1/5444688280/il_570xN.5444688280_dfcz.jpg',
          imageAlt: 'Drawstring top with elastic loop closure and textured interior padding.',
        },
        {
          name: 'Artwork Tees',
          id: '#',
          imageSrc: 'https://shreeman.in/cdn/shop/files/1J8A2073.jpg?v=1685019534&width=3600',
          imageAlt:
            'Three shirts in gray, white, and blue arranged on table with same line drawing of hands and shapes overlapping on front of shirt.',
        },
      ],
      sections: [
        {
          id: 'clothing',
          name: 'Clothing',
          items: [
            { name: 'Mens Kurtas', id: 'mens_kurta' },
            { name: 'Shirt', id: 'shirt' },
            { name: 'Men Jeans', id: 'men_jeans' },
            { name: 'Sweaters', id: 'sweater' },
            { name: 'T-Shirts', id: 't-shirt' },
            { name: 'Jackets', id: 'jackets' },
            { name: 'Activewear', id: 'activewear' },

          ],
        },
        {
          id: 'accessories',
          name: 'Accessories',
          items: [
            { name: 'Watches', id: 'mens_watch' },
            { name: 'Wallets', id: 'mens_wallet' },
            { name: 'Bags', id: 'mens_bag' },
            { name: 'Sunglasses', id: 'mens_sunglasses' },
            { name: 'Hats', id: 'mens_hat' },
            { name: 'Belts', id: 'mens_belt' }
          ],
        },
        {
          id: 'brands',
          name: 'Brands',
          items: [
            { name: 'Re-Arranged', id: '#' },
            { name: 'Counterfeit', id: '#' },
            { name: 'Full Nelson', id: '#' },
            { name: 'My Way', id: '#' },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: 'Company', id: '/company', href: '/company' }
  ],
}