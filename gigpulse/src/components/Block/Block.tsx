export default function Block({ title, value, clickable=false }: {title: string; value: string | number | null; clickable?: boolean}) {
    function extractExcerpt(description: string, maxLength: number) {
        if (description.length <= maxLength) {
          return description;
        } else {
          return description.slice(0, maxLength) + "...";
        }
      }
    return (
        <div className={`border-2 border-gray-200 p-3 rounded-xl mb-4 sm:flex items-baseline gap-2 ${clickable && 'shadow-lg dark:shadow-gray-700 bg-primary text-sm  hover:bg-accent'}`}>
            <div className="pb-2 text-2xl dark:text-gray-200 font-content">{title}</div>
            <div className="text-xl font-bold dark:text-gray-200  overflow-hidden">{typeof value === 'string'? extractExcerpt(value as string,100): value}</div>
        </div>
    );
}