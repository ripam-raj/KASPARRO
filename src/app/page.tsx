import { Header } from '@/components/layouts/Header';
import { Footer } from '@/components/layouts/Footer';
import { Hero } from '@/components/features/Hero';
import { WhyAiSeo } from '@/components/features/WhyAiSeo';
import { ModulesOverview } from '@/components/features/ModulesOverview';
import { PipelineFlow } from '@/components/features/PipelineFlow';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <WhyAiSeo />
      <ModulesOverview />
      <PipelineFlow />
      <Footer />
    </main>
  );
}
