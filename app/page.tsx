import { Header } from '@/components/header';
import { HeroSection } from '@/components/hero-section';
import { LatestHeadlines } from '@/components/latest-headlines';
import { EditorsPicks } from '@/components/editors-picks';
import { VibesNCruise } from '@/components/vibes-n-cruise';
import { JapaRoutes } from '@/components/japa-routes';
import { LifeAfterJapa } from '@/components/life-after-japa';
import { HealthHub } from '@/components/health-hub';
import { TechGadget } from '@/components/tech-gadget';
import { SportsHub } from '@/components/sports-hub';
import { DailyMaple } from '@/components/daily-maple';

import { WorldNews } from '@/components/world-news';
import { BookNook } from '@/components/booknook';
import { Footer } from '@/components/footer';
import { Continent } from '@/components/continent';
import { 
  getLatestHeadlines,
  getEditorsPicks,
  getDailyMaple,
  getBookNook,
  getPosts,
  transformPost,
  getPostsByCategory,
  getAfricaNews,
  getAmericasNews,
  getAustraliaNews,
  getAsiaNews,
  getEuropeNews,
  getUKNews,
  getCanadaNews,
  TransformedPost
} from '@/lib/wordpress';
import { getHomepageYoastSEO, yoastToNextMetadata } from '@/lib/yoast-seo';
import { Metadata } from 'next';

// ISR: Revalidate every 10 minutes
export const revalidate = 600;

// Generate metadata using Yoast SEO
export async function generateMetadata(): Promise<Metadata> {
  try {
    const yoastData = await getHomepageYoastSEO();
    return yoastToNextMetadata(
      yoastData,
      'The Maple Epoch - Breaking News & Latest Updates',
      'Stay informed with real-time coverage of breaking news, politics, business, technology, health, sports, and entertainment.'
    );
  } catch (error) {
    console.error('Error generating homepage metadata:', error);
    return yoastToNextMetadata(null);
  }
}

async function getHomePageData() {
  try {
    // Fetch articles from specific categories for hero section
    const targetCategories = ['politics', 'business', 'technology', 'news', 'sports', 'entertainment', 'japa-routes', 'life-after-japa', 'tech-gadget', 'vibes-n-cruise'];
    const heroArticlesPromises = targetCategories.map(category => 
      getPostsByCategory(category, 3).then(posts => posts.map(transformPost).filter(Boolean))
    );
    
    // Get Editor's Picks from WordPress (sticky posts)
    const editorsPicksPromise = getEditorsPicks(3);
    
    const [
      latestHeadlines,
      editorsPicks,
      dailyMaple,
      japaRoutes,
      lifeAfterJapa,
      healthHub,
      techGadget,
      sportsHub,
      vibesNCruise,
      bookNook,
      heroArticles,
      africaNews,
      americasNews,
      australiaNews,
      asiaNews,
      europeNews,
      ukNews,
      canadaNews,
      ...categoryArticles
    ] = await Promise.allSettled([
      getLatestHeadlines(3),
      editorsPicksPromise,
      getDailyMaple(20),
      getPostsByCategory('japa-routes', 20).then(posts => posts.map(transformPost).filter(Boolean)),
      getPostsByCategory('life-after-japa', 20).then(posts => posts.map(transformPost).filter(Boolean)),
      getPostsByCategory('health', 20).then(posts => posts.map(transformPost).filter(Boolean)),
      getPostsByCategory('tech-gadget', 20).then(posts => posts.map(transformPost).filter(Boolean)),
      getPostsByCategory('sports', 20).then(posts => posts.map(transformPost).filter(Boolean)),
      getPostsByCategory('vibes-n-cruise', 20).then(posts => posts.map(transformPost).filter(Boolean)),
      getBookNook(20),
      getPosts({ per_page: 9, _embed: true }).then(posts => posts.map(transformPost).filter(Boolean)),
      getAfricaNews(20),
      getAmericasNews(20),
      getAustraliaNews(20),
      getAsiaNews(20),
      getEuropeNews(20),
      getUKNews(20),
      getCanadaNews(20),
      ...heroArticlesPromises
    ]);

    // Combine articles from all target categories for hero section
    const combinedHeroArticles: TransformedPost[] = [];
    categoryArticles.forEach(result => {
      if (result.status === 'fulfilled') {
        combinedHeroArticles.push(...(result.value || []).filter(Boolean));
      }
    });

    return {
      latestHeadlines: latestHeadlines.status === 'fulfilled' ? latestHeadlines.value : [],
      editorsPicks: editorsPicks.status === 'fulfilled' ? editorsPicks.value : [],
      dailyMaple: dailyMaple.status === 'fulfilled' ? dailyMaple.value : [],
      japaRoutes: japaRoutes.status === 'fulfilled' ? japaRoutes.value : [],
      lifeAfterJapa: lifeAfterJapa.status === 'fulfilled' ? lifeAfterJapa.value : [],
      healthHub: healthHub.status === 'fulfilled' ? healthHub.value : [],
      techGadget: techGadget.status === 'fulfilled' ? techGadget.value : [],
      sportsHub: sportsHub.status === 'fulfilled' ? sportsHub.value : [],
      vibesNCruise: vibesNCruise.status === 'fulfilled' ? vibesNCruise.value : [],
      bookNook: bookNook.status === 'fulfilled' ? bookNook.value : [],
      heroArticles: combinedHeroArticles.length > 0 ? combinedHeroArticles : (heroArticles.status === 'fulfilled' ? (heroArticles.value || []) : []),
      africaNews: africaNews.status === 'fulfilled' ? africaNews.value : [],
      americasNews: americasNews.status === 'fulfilled' ? americasNews.value : [],
      australiaNews: australiaNews.status === 'fulfilled' ? australiaNews.value : [],
      asiaNews: asiaNews.status === 'fulfilled' ? asiaNews.value : [],
      europeNews: europeNews.status === 'fulfilled' ? europeNews.value : [],
      ukNews: ukNews.status === 'fulfilled' ? ukNews.value : [],
      canadaNews: canadaNews.status === 'fulfilled' ? canadaNews.value : [],
    };
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    return {
      latestHeadlines: [],
      editorsPicks: [],
      dailyMaple: [],
      japaRoutes: [],
      lifeAfterJapa: [],
      healthHub: [],
      techGadget: [],
      sportsHub: [],
      vibesNCruise: [],
      bookNook: [],
      heroArticles: [],
      africaNews: [],
      americasNews: [],
      australiaNews: [],
      asiaNews: [],
      europeNews: [],
      ukNews: [],
      canadaNews: [],
    };
  }
}

export default async function Home() {
  const data = await getHomePageData();

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <main>
        <HeroSection articles={data.heroArticles} />
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-12">
            <WorldNews 
              africaArticle={Array.isArray(data.africaNews) ? data.africaNews[0] || null : data.africaNews}
              americasArticle={Array.isArray(data.americasNews) ? data.americasNews[0] || null : data.americasNews}
              australiaArticle={Array.isArray(data.australiaNews) ? data.australiaNews[0] || null : data.australiaNews}
              asiaArticle={Array.isArray(data.asiaNews) ? data.asiaNews[0] || null : data.asiaNews}
              europeArticle={Array.isArray(data.europeNews) ? data.europeNews[0] || null : data.europeNews}
              ukArticle={Array.isArray(data.ukNews) ? data.ukNews[0] || null : data.ukNews}
              allArticles={{
                africaNews: Array.isArray(data.africaNews) ? data.africaNews : [],
                americasNews: Array.isArray(data.americasNews) ? data.americasNews : [],
                australiaNews: Array.isArray(data.australiaNews) ? data.australiaNews : [],
                asiaNews: Array.isArray(data.asiaNews) ? data.asiaNews : [],
                europeNews: Array.isArray(data.europeNews) ? data.europeNews : [],
                ukNews: Array.isArray(data.ukNews) ? data.ukNews : [],
                canadaNews: Array.isArray(data.canadaNews) ? data.canadaNews : []
              }}
            />
      <LatestHeadlines articles={data.latestHeadlines} />
      <JapaRoutes articles={data.japaRoutes} />
      <LifeAfterJapa articles={data.lifeAfterJapa} />
      <HealthHub articles={data.healthHub} />
      <TechGadget articles={data.techGadget} />
      <SportsHub articles={data.sportsHub} />
      <EditorsPicks articles={data.editorsPicks} />
      <VibesNCruise articles={data.vibesNCruise} />
            <DailyMaple articles={data.dailyMaple} />
            <BookNook articles={data.bookNook} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}