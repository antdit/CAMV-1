# Change Log

## 0.2.0 (2017-3-17)

Features
  - Added search functionality
  - Use A4 ratio for export images
  - Track version of CAMV / pycamverter used to generate files.
  - Added modal view for determining which b/y ions were identified in a peptide.

## 0.1.6 (2017-03-13)

Features

  - Added a icon to CAMV packaged executable

Bugfixes

  - Include electron-compile to fix windows error

## 0.1.5 (2017-03-10)

Features

  - Color isotope peaks yellow as in CAMV-matlab
  - Label peaks with magenta star when ppm > CID / HCD_TOL

## 0.1.4 (2017-03-06)

Fixed several CI bugs, should deploy on Windows, Linux, and OS X now.

## 0.1.2 (2017-03-06)

Several changes to the building pipeline. Relies only on electron-forge /
electron-prebuilt-compile now.

## 0.1.1 (2017-03-06)

Fixed several bugs based on testing with real data sets

Features

  - Added k/j navigation, alongside up/down
  - Added spectra zoom support
  - Use greener greens for matching ions
  - Reduced label clutter on spectra
  - Show observed vs. expected m/z values

Bugfixes

  - Corrected modified cysteine mass
  - Fixed bug with loading large files
  - Only label best matching precursor / quant ions

## 0.1.0 (2017-03-02)

Initial release
