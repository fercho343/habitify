{ pkgs, ... }: {

  # Which nixpkgs channel to use.
  channel = "stable-23.11"; # or "unstable"

  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.bun
    pkgs.nodejs_21
  ];

  # Sets environment variables in the workspace
  env = {
    
  };

  # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
  idx.extensions = [
    
  ];

  # Enable previews and customize configuration
  idx.previews = {
    enable = true;
    previews = [];
  };
}