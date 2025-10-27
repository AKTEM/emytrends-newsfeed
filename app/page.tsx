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
import { BusinessEconomy } from '@/components/business-economy';
import { Education } from '@/components/education';
import { Finance } from '@/components/finance';
import { Footer } from '@/components/footer';
import { 
  getLatestHeadlines,
  getEditorsPicks,
  getDailyMaple,
  getBookNook,
  getMapleTravel,
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
      businessEconomy,
      japaRoutes,
      lifeAfterJapa,
      healthHub,
      techGadget,
      sportsHub,
      vibesNCruise,
      finance,
      heroArticles,
      academics,
      migration,
      examAdmission,
      learningCareer,
      scholarships,
      studentLife,
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
      businessEconomy: businessEconomy.status === 'fulfilled' ? businessEconomy.value : [],
      japaRoutes: japaRoutes.status === 'fulfilled' ? japaRoutes.value : [],
      lifeAfterJapa: lifeAfterJapa.status === 'fulfilled' ? lifeAfterJapa.value : [],
      healthHub: healthHub.status === 'fulfilled' ? healthHub.value : [],
      techGadget: techGadget.status === 'fulfilled' ? techGadget.value : [],
      sportsHub: sportsHub.status === 'fulfilled' ? sportsHub.value : [],
      vibesNCruise: vibesNCruise.status === 'fulfilled' ? vibesNCruise.value : [],
      finance: finance.status === 'fulfilled' ? finance.value : [],
      heroArticles: combinedHeroArticles.length > 0 ? combinedHeroArticles : (heroArticles.status === 'fulfilled' ? (heroArticles.value || []) : []),
      academics: academics.status === 'fulfilled' ? academics.value : [],
      migration: migration.status === 'fulfilled' ? migration.value : [],
      examAdmission: examAdmission.status === 'fulfilled' ? examAdmission.value : [],
      learningCareer: learningCareer.status === 'fulfilled' ? learningCareer.value : [],
      scholarships: scholarships.status === 'fulfilled' ? scholarships.value : [],
      studentLife: studentLife.status === 'fulfilled' ? studentLife.value : [],
      canadaNews: canadaNews.status === 'fulfilled' ? canadaNews.value : [],
    };
  } catch (error) {
    console.error('Error fetching homepage data:', error);
    return {
      latestHeadlines: [],
      editorsPicks: [],
      businessEconomy: [],
      japaRoutes: [],
      lifeAfterJapa: [],
      healthHub: [],
      techGadget: [],
      sportsHub: [],
      vibesNCruise: [],
      finance: [],
      heroArticles: [],
      academics: [],
      migration: [],
      examAdmission: [],
      learningCareer: [],
      scholarships: [],
      studentLife: [],
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
            <Education 
              africaArticle={Array.isArray(data.academics) ? data.academics[0] || null : data.academics}
              americasArticle={Array.isArray(data.migration) ? data.migration[0] || null : data.migration}
              australiaArticle={Array.isArray(data.examAdmission) ? data.examAdmission[0] || null : data.examAdmission}
              asiaArticle={Array.isArray(data.learningCareer) ? data.learningCareer[0] || null : data.learningCareer}
              europeArticle={Array.isArray(data.scholarships) ? data.scholarships[0] || null : data.scholarships}
              ukArticle={Array.isArray(data.studentLife) ? data.studentLife[0] || null : data.studentLife}
              allArticles={{
                africaNews: Array.isArray(data.academics) ? data.academics : [],
                americasNews: Array.isArray(data.migration) ? data.migration : [],
                australiaNews: Array.isArray(data.examAdmission) ? data.examAdmission : [],
                asiaNews: Array.isArray(data.learningCareer) ? data.learningCareer : [],
                europeNews: Array.isArray(data.scholarships) ? data.scholarships : [],
                ukNews: Array.isArray(data.studentLife) ? data.studentLife : [],
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
            <BusinessEconomy articles={data.businessEconomy} />
            <Finance articles={data.finance} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}