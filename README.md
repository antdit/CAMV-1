# CAMV

[![Build Status](https://img.shields.io/travis/white-lab/CAMV.svg)](https://travis-ci.org/white-lab/CAMV)
[![Build status](https://ci.appveyor.com/api/projects/status/iva4po0glnswboc1?svg=true)](https://ci.appveyor.com/project/naderm/camv)

Tool for validation proteomic mass spectrometry peptide assignments.

# Dependencies

You will first need to [install the latest Node.js](https://nodejs.org/en/) as
well as [git](https://git-scm.com/) (for `bower`).


Once those are installed, from `src/` run:

```
npm install
npm install bower -g
bower install
```

# Usage

From this directory, run:

```
npm start
```

# Deployment

From this directory, run:

```
npm run package
```

This will generate fully-independent packages for Linux, Windows, and OS X. You
can also download automated builds of tagged releases from [this repository's
releases page](https://github.com/naderm/CAMV/releases).

# Testing

Choose `examples/testData.camv`
