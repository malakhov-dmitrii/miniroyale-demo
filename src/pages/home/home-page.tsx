import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { TypographyH1 } from '@/components/ui/typography';
import { Character, useCharacters } from '@/hooks/api';
import { getAvatarUrl } from '@/lib/dicebear';
import { cn } from '@/lib/utils';
import { Link } from '@tanstack/router';
import { Car, Eye, Film, Plane } from 'lucide-react';
import { useEffect, useState } from 'react';

const PlaceholderCard = () => <div className="w-full h-[350px] bg-slate-400 animate-pulse rounded"></div>;

function CharacterCard(props: { character: Character }) {
  // we can extract this to custom img component wrapper
  const [imgLoaded, setimgLoaded] = useState(false);
  const id = props.character.url.split('/')[5];

  return (
    <Link to="/character/$id" params={{ id }}>
      <Card className="transition cursor-pointer hover:shadow-lg group">
        <div className="overflow-hidden aspect-square rounded-t-md">
          <img
            className={cn(
              'h-full w-full bg-slate-200 group-hover:scale-125 group-hover:filter group-hover:grayscale transition',
              !imgLoaded && 'animate-pulse'
            )}
            onLoad={() => setimgLoaded(true)}
            src={getAvatarUrl(props.character.name)}
            alt=""
          />
        </div>
        <CardHeader>
          <div className="flex justify-between">
            <CardTitle>{props.character.name}</CardTitle>
            <Eye
              className="w-6 h-6 p-1 rounded-full shadow bg-slate-300"
              style={{
                color: props.character.eye_color,
              }}
            />
          </div>
          <div className="flex text-sm divide-x text-muted-foreground">
            <div className="flex items-center gap-2 pr-2">
              <Film className="w-4 h-4" />
              <p>{props.character.films.length}</p>
            </div>

            <div className="flex items-center gap-2 px-2">
              <Car className="w-4 h-4" />
              <p>{props.character.vehicles.length}</p>
            </div>
            <div className="flex items-center gap-2 px-2">
              <Plane className="w-4 h-4" />
              <p>{props.character.starships.length}</p>
            </div>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
}

const HomePage = () => {
  const [search, setSearch] = useState('');
  const [pageIndex, setPageIndex] = useState(1);
  const data = useCharacters(pageIndex);

  useEffect(() => {
    setSearch('');
  }, [pageIndex]);

  return (
    <>
      <div className="flex flex-wrap items-end justify-between">
        <TypographyH1>Star Wars Characters</TypographyH1>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="search">
            Search
          </label>
          <Input
            id="search"
            className="max-w-xs"
            placeholder="Search on page..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-flow-row grid-cols-2 gap-4 mt-8 xl:grid-cols-5 md:grid-cols-4 lg:grid-cols-5">
        {data.isLoading && Array.from({ length: 10 }).map((_, i) => <PlaceholderCard key={i} />)}
        {data.data?.results
          ?.filter(i => i.name.toLowerCase().includes(search.toLowerCase().trim()))
          .map(character => (
            <CharacterCard key={character.url} character={character}></CharacterCard>
          ))}
      </div>
      <div className="flex justify-center gap-4 mt-4">
        <Button disabled={!data.data?.previous} variant="outline" onClick={() => setPageIndex(pageIndex - 1)}>
          Previous
        </Button>
        <Button disabled={!data.data?.next} variant="outline" onClick={() => setPageIndex(pageIndex + 1)}>
          Next
        </Button>
      </div>
    </>
  );
};

export default HomePage;
