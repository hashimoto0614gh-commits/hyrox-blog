export interface WPPost {
  id: number;
  date: string;
  slug: string;
  link: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
      media_details?: { sizes?: { medium_large?: { source_url: string } } };
    }>;
    'wp:term'?: Array<Array<{ id: number; name: string; slug: string }>>;
  };
}

export interface FetchPostsOptions {
  perPage?: number;
  page?: number;
  categorySlug?: string;
  search?: string;
}

/**
 * WordPress REST API からポスト一覧を取得する。
 * ビルド時（SSG）または getStaticProps 相当で呼ぶ想定。
 * @param endpoint - WordPress サイトの URL（末尾スラッシュなし）
 */
export async function fetchPosts(
  endpoint: string,
  options: FetchPostsOptions = {},
): Promise<WPPost[]> {
  const { perPage = 6, page = 1, categorySlug, search } = options;

  const url = new URL(`${endpoint}/wp-json/wp/v2/posts`);
  url.searchParams.set('_embed', '1');
  url.searchParams.set('per_page', String(perPage));
  url.searchParams.set('page', String(page));
  url.searchParams.set('status', 'publish');
  if (search) url.searchParams.set('search', search);

  try {
    const res = await fetch(url.toString(), {
      headers: { Accept: 'application/json' },
      // Astro の fetch は Node fetch 互換
    });
    if (!res.ok) {
      console.warn(`[WP API] ${res.status} ${res.statusText} — ${url}`);
      return [];
    }
    return (await res.json()) as WPPost[];
  } catch (err) {
    console.warn('[WP API] fetch failed:', err);
    return [];
  }
}

/** フィーチャード画像 URL を取得する */
export function getFeaturedImage(post: WPPost): string {
  const media = post._embedded?.['wp:featuredmedia']?.[0];
  return (
    media?.media_details?.sizes?.medium_large?.source_url ??
    media?.source_url ??
    ''
  );
}

/** カテゴリ名一覧を取得する */
export function getCategories(post: WPPost): string[] {
  return post._embedded?.['wp:term']?.[0]?.map(t => t.name) ?? [];
}

/** WordPress の date 文字列を日本語表示用にフォーマット */
export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
}

/** excerpt の HTML タグを除去して平文にする */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]+>/g, '').trim();
}
