"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import fallback from "../../../content/blog/blog.json";

export default function BlogFeed({ content = fallback }: { content?: typeof fallback }) {
  const [category, setCategory] = useState("All stories");
  const [query, setQuery] = useState("");
  const [selectedStory, setSelectedStory] = useState<typeof content.stories[number] | null>(null);
  const storyDialog = useRef<HTMLDialogElement>(null);
  const filteredStories = useMemo(() => content.stories.filter((story) => {
    const matchesCategory = category === "All stories" || story.category === category;
    const searchText = `${story.title} ${story.excerpt} ${story.category}`.toLowerCase();
    return matchesCategory && searchText.includes(query.trim().toLowerCase());
  }), [category, query, content]);

  useEffect(() => {
    const dialog = storyDialog.current;
    if (!dialog) return;
    if (selectedStory && !dialog.open) dialog.showModal();
    if (!selectedStory && dialog.open) dialog.close();
  }, [selectedStory]);

  return <section className="blog-stories" id="stories" aria-labelledby="stories-title">
    <div className="blog-stories-heading">
      <div><p className="blog-eyebrow"><span /> FROM THE TRAVERSE BLOG</p><h2 id="stories-title">Latest posts<span>.</span></h2></div>
      <p>Practical guides for a safer, more open internet.</p>
    </div>
    <div className="blog-controls">
      <div className="blog-categories" role="group" aria-label="Filter stories by category">
        {content.categories.map((item) => <button type="button" key={item} className={category === item ? "is-active" : ""} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
      </div>
      <label className="blog-search"><span className="sr-only">Search stories</span><svg viewBox="0 0 20 20" aria-hidden="true"><circle cx="8.5" cy="8.5" r="5.5"/><path d="m13 13 4 4"/></svg><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search stories" /></label>
    </div>
    <div className="blog-card-grid" aria-live="polite">
      {filteredStories.map((story, index) => <button type="button" className={`blog-card${index === 0 ? " blog-card--featured" : ""}`} key={story.number} onClick={() => setSelectedStory(story)} aria-label={`View story: ${story.title}`}>
        <div className="blog-card-image"><Image src={story.image} alt={story.alt} fill priority={index === 0} sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 66vw" /><span>{story.number}</span><span className="blog-card-image-arrow" aria-hidden="true">↗</span></div>
        <div className="blog-card-content">
          <div className="blog-card-meta"><span>{story.date}</span><span>{story.read}</span></div>
          <p className="blog-card-category">{story.category}</p>
          <h3>{story.title}</h3>
          <p className="blog-card-excerpt">{story.excerpt}</p>
          <div className="blog-card-author"><span className="blog-author-avatar">T</span><span>{story.author}</span></div>
          <span className="blog-card-view">View story <b aria-hidden="true">↗</b></span>
        </div>
      </button>)}
      {filteredStories.length === 0 && <div className="blog-empty"><p>{content.stories.length === 0 ? "New stories are on the way." : "No stories match that search. Try another phrase or category."}</p><button type="button" onClick={() => { setCategory("All stories"); setQuery(""); }}>View all posts <span aria-hidden="true">↗</span></button></div>}
    </div>
    <dialog className="blog-story-dialog" ref={storyDialog} aria-labelledby="blog-story-title" onClose={() => setSelectedStory(null)}>
      {selectedStory && <><button className="blog-story-close" type="button" onClick={() => storyDialog.current?.close()} aria-label="Close story">×</button><div className="blog-story-image"><Image src={selectedStory.image} alt={selectedStory.alt} fill sizes="(max-width:700px) 90vw, 720px"/></div><div className="blog-story-copy"><p className="blog-eyebrow"><span/> {selectedStory.category} <i>/</i> {selectedStory.read}</p><h2 id="blog-story-title">{selectedStory.title}</h2><p>{selectedStory.excerpt}</p><div className="blog-story-meta"><span>{selectedStory.author}</span><span>{selectedStory.date}</span></div><button className="blog-story-back" type="button" onClick={() => storyDialog.current?.close()}>Back to all posts <span aria-hidden="true">↗</span></button></div></>}
    </dialog>
  </section>;
}
