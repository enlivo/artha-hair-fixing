import { useEffect, useState } from 'react'

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY
const CHANNEL_HANDLE = '@arthahairfixingnonsurgical1071'
const CACHE_KEY = 'artha_youtube_videos_v1'
const MAX_PAGES = 4 // caps quota usage at ~200 videos per session

async function resolveUploadsPlaylistId() {
  const url = `https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forHandle=${encodeURIComponent(CHANNEL_HANDLE)}&key=${API_KEY}`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to resolve channel')
  const data = await res.json()
  const uploadsId = data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads
  if (!uploadsId) throw new Error('Channel not found')
  return uploadsId
}

async function fetchAllUploads(playlistId) {
  const videos = []
  let pageToken = ''
  let page = 0

  do {
    const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${API_KEY}${pageToken ? `&pageToken=${pageToken}` : ''}`
    const res = await fetch(url)
    if (!res.ok) throw new Error('Failed to fetch videos')
    const data = await res.json()

    data.items?.forEach((item) => {
      const videoId = item.snippet?.resourceId?.videoId
      if (!videoId) return
      videos.push({
        id: videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails?.medium?.url || item.snippet.thumbnails?.default?.url,
      })
    })

    pageToken = data.nextPageToken
    page += 1
  } while (pageToken && page < MAX_PAGES)

  return videos
}

export default function useYoutubeChannelVideos() {
  const [videos, setVideos] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    const cached = sessionStorage.getItem(CACHE_KEY)
    if (cached) {
      try {
        const parsed = JSON.parse(cached)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setVideos(parsed)
          setLoading(false)
          return
        }
      } catch {
        sessionStorage.removeItem(CACHE_KEY)
      }
    }

    async function load() {
      try {
        if (!API_KEY) throw new Error('Missing YouTube API key')
        const uploadsId = await resolveUploadsPlaylistId()
        const allVideos = await fetchAllUploads(uploadsId)
        if (cancelled) return
        setVideos(allVideos)
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(allVideos))
      } catch (err) {
        if (!cancelled) setError(err.message || 'Failed to load videos')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [])

  return { videos, loading, error }
}
