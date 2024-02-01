import Image from 'next/legacy/image';
import Link from 'next/link';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { SearchBar } from '@/components/search-bar';
import { SelectCategory } from '@/components/select-category';
import { UserMenu } from '@/components/user-menu';

export async function Navbar() {
  return (
    <AppBar position="fixed">
      <Toolbar sx={{ backgroundColor: 'background.paper' }}>
        <Link href="/">
          <Image src="/logo.png" width={147.66} height={63.66} alt="logo" priority />
        </Link>
        <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center', ml: 1 }}>
          <SearchBar />
        </Box>
        <IconButton LinkComponent={Link} size="large" href="/my-cart">
          <ShoppingCartIcon />
        </IconButton>
        <UserMenu user={{}} />
      </Toolbar>
      <Toolbar
        sx={{
          backgroundColor: 'background.paper',
          display: 'flex',
          alignContent: 'center',
          p: 1,
        }}
      >
        <SelectCategory categories={[]} />
        <Box component={Link} href={'/'} sx={{ textDecoration: 'none', display: 'flex', ml: 3 }}>
          <HomeIcon sx={{ color: 'text.primary' }} />
          <Typography color="text.primary" sx={{ fontWeight: 500, display: 'flex' }}>
            Home
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
