import React from 'react';
import { Box, Typography } from '@mui/material';
import './Footer.css';

const Footer = () => {
  return (
    <Box
      component="footer"
      className="footer"
    >
      <Typography variant="body2" color="inherit" className="footerText">
        Benedek Toth - 2025-11-10
      </Typography>
      <Typography variant="body2" color="inherit" className="footerText">
        Frontend:
        <a
          href="https://github.com/benedektothten/AbacusFileFE"
          target="_blank"
          rel="noopener noreferrer"
          className="footerLink"
        >
          <img
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            alt="GitHub"
          />
        </a>
      </Typography>
      <Typography variant="body2" color="inherit" className="footerText">
        Backend:
        <a
          href="https://github.com/benedektothten/AbacusFileService"
          target="_blank"
          rel="noopener noreferrer"
          className="footerLink"
        >
          <img
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            alt="GitHub"
          />
        </a>
      </Typography>
    </Box>
  );
};

export default Footer;