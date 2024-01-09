// JSX Fragments for the Tutorial page
import styles from '../styles/tutorial.module.scss'
import { useState } from 'react'
import { getPlaylists } from '../utility/spotifyAPI_Interactions'
import { Suspense, } from 'react'
import { Await } from 'react-router-dom'
export const PlaylistSelect = ({ screenSize }) => {
  const [selectedPlaylist, setSelectedPlaylist] = useState({id: null, name: null})
  console.log(selectedPlaylist, 'selectedPlaylist')
  const playlistPromsise = getPlaylists()
  const handleSelectPlaylist = (id, name) => {
    setSelectedPlaylist({id, name})
  }
  
  return (
    <div className={styles.select}>
      <h1 className={styles.select_header}>
        {screenSize ? 'Import' : 'Import New Playlist'}
      </h1>
      <p className={styles.tooltip}>Select a playlist to start !</p>
      <p className={styles.tooltip_warning}>
        ✨ playlists must be made public to appear!
      </p>
      <div className={styles.playlist_selection}>
        <Suspense fallback={<p>Loading...</p>}>
            <Await resolve={playlistPromsise}>
                {(data) => {
                    console.log(data, 'data');
                    return (
                        <div className={styles.playlist_wrapper}>
                            {data.items.map((playlist) => {
                                return (
                                    <div
                                        className={styles.playlist}
                                        key={playlist.id}
                                        onClick={(e) => {
                                            e.preventDefault();
                                          handleSelectPlaylist(playlist.id, playlist.name)}}
                                        style={{ 
                                            backgroundImage: `url(${playlist.images[0].url})`,
                                            backgroundSize: 'cover',
                                            backgroundPosition: 'center',
                                            backgroundRepeat: 'no-repeat',
                                            minHeight: '100px',
                                            minWidth: '100px', }}
                                    ></div>
                                );
                            })}
                        </div>
                    );
                }}
            </Await>
        </Suspense>
        
      </div>
      <button className={styles.import_btn}>
       Import {selectedPlaylist.name ? selectedPlaylist.name : 'Playlist'}
      </button>
    </div>
  )
}


export const PlaylistCreate = (
  <>
    <div></div>
  </>
)
