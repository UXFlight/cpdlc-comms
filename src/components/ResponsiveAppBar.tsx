import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
//import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button, { ButtonProps } from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { styled } from "@mui/material/styles";

const pages = [
  "Logon",
  "Message Log",
  "New Message",
  "Reports",
  "Emergency",
  "Settings"
];
const pages_icon = [
  "https://file.rendit.io/n/yYL7HtJnD2cY5FBYaBZ8.svg",
  "https://file.rendit.io/n/Ssn9cngQU48cpgtdvH3X.svg",
  "https://file.rendit.io/n/CmYSsxP9CE4MwjPKhmAJ.svg",
  "https://file.rendit.io/n/txwa85wRQ96eckivoSQu.svg",
  "https://file.rendit.io/n/XmbF2fWH9wOslXoKU2yg.svg",
  "https://file.rendit.io/n/SXx3x0u2izCLndr415tz.svg"
];
const pages_active = [true, false, false, false, false, false];

export default function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handlePrint = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const MenuButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText("#fff"),
    borderColor: "#1cccc4",
    "&:hover": {
      backgroundColor: "#3b9673"
    }
  }));

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#242424"
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <div className="bg-[linear-gradient(90deg,_#1cccc4_0%,#3b9673_100%)] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat flex flex-col justify-center mr-3 w-12 shrink-0 h-12 items-center rounded-[48px]">
            <img
              src="https://file.rendit.io/n/d67RS9nQ0ozn4pRg16AA.svg"
              className="w-6"
              alt="HOME"
            />
          </div>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left"
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" }
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none"
            }}
          >
            CPDLC
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, index) => (
              <MenuButton
                key={page}
                onClick={handleCloseNavMenu}
                variant={pages_active[index] ? "outlined" : "text"}
                color="success"
                sx={{
                  my: 2,
                  color: "white",
                  display: "block"
                }}
              >
                <div className="flex flex-col items-center">
                  <img
                    src={pages_icon[index]}
                    alt={pages_icon[index]}
                    className="w-6"
                  />
                  <div className="w-28 text-center text-xs font-['Noto_Sans'] font-bold text-white/80">
                    {page}
                  </div>
                </div>
              </MenuButton>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Print">
              <Button
                onClick={handlePrint}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <div
                  className="bg-[url(https://file.rendit.io/n/Ehe5zLDTqBjDAg5ye8EX.svg)] bg-cover bg-50%_50% bg-blend-normal bg-no-repeat relative flex flex-col justify-end w-12 shrink-0 items-center pt-6 pb-1 px-2"
                  id="Path"
                >
                  <img
                    src="https://file.rendit.io/n/TqSh3YSwbJ2bz2VaIm21.svg"
                    className="w-6 h-4 absolute top-2"
                    alt="PRINT"
                  />
                  <div className="text-center text-xs font-['Open_Sans'] font-bold text-white/80 ">
                    PRINT
                  </div>
                </div>
              </Button>
            </Tooltip>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}