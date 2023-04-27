import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { TypographyH1 } from '@/components/ui/typography';
import { useCharacterItem } from '@/hooks/api';
import { Link, useParams } from '@tanstack/router';
import { ArrowLeft, Car, Film, Plane } from 'lucide-react';
import useSWRMutation from 'swr/mutation';

const valueFormatter = (value: string | string[]) => {
  if (Array.isArray(value)) {
    return value.join(', ');
  }
  if (new Date(value).toString() !== 'Invalid Date') {
    return new Date(value).toLocaleDateString();
  }
  return value || 'n/a';
};

const CharacterPage = () => {
  const { id } = useParams();
  const data = useCharacterItem(id);
  type DataKey = keyof typeof data.data;

  const m = useSWRMutation(`https://swapi.dev/api/people/${id}`, () => data.data);

  console.log(data.isValidating);

  function handleEdit(e: React.FormEvent<HTMLTableCellElement>, key: DataKey) {
    if (data.data) {
      const value = e.currentTarget.textContent || '';
      const isArrayKey = data.data[key] && (Array.isArray(data.data[key]) as boolean);
      if (isArrayKey) {
        // @ts-expect-error its fine here
        data.data[key] = value
          .split(',')
          .map(v => v.trim())
          .filter(v => v);
        return;
      }

      const isDateKey = data.data[key] && new Date(data.data[key]).toString() !== 'Invalid Date';
      if (isDateKey) {
        // @ts-expect-error its fine
        data.data[key] = new Date(value);
        return;
      }

      // @ts-expect-error its fine
      data.data[key] = value;
    }
  }

  return (
    <>
      <Link to="/">
        <Button variant="link">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      </Link>
      {!data.data?.name ? <Skeleton className="h-12 rounded-md max-w-sm" /> : <TypographyH1>{data.data?.name}</TypographyH1>}

      <div className="mt-2">
        {data.data ? (
          <div className="flex divide-x text-sm text-muted-foreground">
            <div className="flex gap-2 items-center pr-2">
              <Film className="w-4 h-4" />
              <p>{data.data?.films.length}</p>
            </div>

            <div className="flex gap-2 items-center px-2">
              <Car className="w-4 h-4" />
              <p>{data.data?.vehicles.length}</p>
            </div>
            <div className="flex gap-2 items-center px-2">
              <Plane className="w-4 h-4" />
              <p>{data.data?.starships.length}</p>
            </div>
          </div>
        ) : (
          <Skeleton className="h-6 rounded-md max-w-xs" />
        )}
      </div>

      <div className="mt-4">
        {data.data ? (
          <div className="w-full overflow-y-auto">
            <table className="w-full">
              <thead>
                <tr className="m-0 border-t p-0 even:bg-muted">
                  <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                    Property
                  </th>
                  <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(data.data || {}).map(([key, value]) => {
                  return (
                    <tr className="m-0 border-t p-0 even:bg-muted" key={key}>
                      <td className="border font-semibold px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right capitalize">
                        {key.replaceAll('_', ' ')}
                      </td>
                      <td
                        className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right"
                        contentEditable
                        suppressContentEditableWarning
                        suppressHydrationWarning
                        onBlur={() => m.trigger()}
                        onInput={e => handleEdit(e, key as DataKey)}
                        dangerouslySetInnerHTML={{ __html: valueFormatter(value) }}
                      />
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <Skeleton className="h-[700px] rounded-md" />
        )}
      </div>
    </>
  );
};

export default CharacterPage;
