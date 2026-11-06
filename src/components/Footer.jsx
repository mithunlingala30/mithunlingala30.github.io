import { profile } from '../data/portfolio'
export default function Footer() {
  return (
    <footer className="band footer">
      <div className="wrap">© {new Date().getFullYear()} <b>{profile.name}</b> · Crafted in maroon &amp; beige</div>
    </footer>
  )
}
