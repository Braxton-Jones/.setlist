# Setlist

## Introduction

Setlist is a playlist sharing service that seamlessly integrates with the Spotify API. It allows users to create, discover, and share playlists effortlessly. With Setlist, users can curate personalized playlists and find new ones . Setlist redefines playlist sharing by offering a user-friendly interface and a vast music library at users' fingertips

Right now, I'm working on getting an extension from Spotify so I can go live with this project. Until then, I'll be showing off the app's features here. Honestly, it's kind of nice because it gives me a chance to create a better README.  It'll be clearer for everyone to see what the app can do. So, while I'm waiting for Spotify's approval, I'm taking the time to lay everything out nicely here. Once we're good to go, it'll be smooth sailing for the project's launch.


## How It Works 

https://github.com/Braxton-Jones/.setlist/assets/58635532/fedc1ccd-2c40-4ec2-9088-c00ed533f17e

To get started with the app, sign in using Spotify's authorization. Once authenticated, you'll be directed to the homepage. From there, you'll notice the "Import" button prominently displayed. Click on this button to initiate the playlist import process.

Upon clicking the "Import" button, a modal will pop up, presenting you with a list of all your publicly available playlists from your Spotify account. Browse through your playlists and select the one you'd like to import into the app.

Once you've chosen a playlist, you can add additional metadata such as featured artists, genre, and purpose. This step allows you to customize and enhance the playlist's description before sharing it with others.

Back on the homepage, you also have the option to search for other playlists to import. Utilize the search functionality to discover and import playlists that resonate with your musical preferences and interests.



## Features

- Import Playlist from Spotify and add metadata like genres, featured artists and reason
- Share Playlists with Others
- Discover new playlists made for different vibes and occasions

### Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/Braxton-Jones/.setlist
   ```

2. Navigate to the project directory:

   ```bash
   cd .setlist
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm start
   ```

The project should now be accessible in your web browser at [http://localhost:3000](http://localhost:3000).

## Configuration

### Environment Variables

You need to add your own env variables, in this case you need a Spotify API account and a database

```env
DATABASE_URL=""
DIRECT_URL=""
SPOTIFY_CLIENT_ID=""
SPOTIFY_CLIENT_SECRET=""
SPOTIFY_REDIRECT_URI=""
```
