import { useEffect, useState } from 'react'
import './Portfolio.css'
import NavBar from './NavBar.tsx'
import { GetPortfolio } from './GetPortfolio.ts'
import type { PortItem } from './GetPortfolio.ts'

function Portfolio() {
    interface FilterState {
        searchQuery: string;
        is_large_scale: boolean;
        is_major: boolean;
        is_minor: boolean;
        is_grouped: boolean;
    }

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [basePortItems, setBasePortItems] = useState<PortItem[]>([]);
    const [portItems, setPortItems] = useState<PortItem[]>([]);
    const [filters, setFilters] = useState<FilterState>({
        searchQuery: '',
        is_large_scale: true,
        is_major: true,
        is_minor: true,
        is_grouped: true
    });

    const fetchPortItems = async () => {
        try {
            const items = await GetPortfolio();
            setBasePortItems(items);
        } catch (err) {
            console.error('Error fetching portfolio items:', err);
            setError(err instanceof Error ? err.message : 'Failed to load portfolio items');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchPortItems();
    }, []);

    const filterPortItems = async () => {
        try {
            let filteringItems = basePortItems;
            if (filters.searchQuery) { // Filters by name
                filteringItems = filteringItems.filter(item =>
                    item.name.toLowerCase().includes(filters.searchQuery?.toLowerCase() || "")
                );
            }
            if (!filters.is_large_scale) { // Filters out large scale projects
                filteringItems = filteringItems.filter(item =>
                    item.importance !== "large_scale"
                );
            }
            if (!filters.is_major) { // Filters out major projects
                filteringItems = filteringItems.filter(item =>
                    item.importance !== "major"
                );
            }
            if (!filters.is_minor) { // Filters out minor projects
                filteringItems = filteringItems.filter(item =>
                    item.importance !== "minor"
                );
            }
            if (!filters.is_grouped) { // Filters out grouped projects
                filteringItems = filteringItems.filter(item =>
                    item.importance !== "grouped"
                );
            }
            filteringItems.sort((a, b) => {
                const importanceOrder: Record<string, number> = {
                    "large_scale": 1,
                    "major": 2,
                    "minor": 3,
                    "grouped": 4
                };
                return (importanceOrder[a.importance] || 999) - (importanceOrder[b.importance] || 999);
            });
            console.log("Fetched items:", filteringItems, basePortItems);
            setPortItems(filteringItems);
        } catch (err) {
            console.error('Error fetching items:', err);
            setError(err instanceof Error ? err.message : 'Failed to load portfolio');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        filterPortItems();
    }, [filters, basePortItems]);

    return (
        <>
            <title>Dylan Yarbrough - Portfolio</title>
            <NavBar />

            <section id="center">
                <div>
                    <h1>Portfolio</h1>
                    <p>
                        Below is a collection of projects I have worked on. They include links of where to view them, as well as any GitHub repositories.<br />
                        Additional projects can be found at <a href="https://github.com/DillDogG" target="_blank">​DillDogG (Dylan Yarbrough)</a><br />
                        Additional personal games can be viewed at <a href="https://dilldoggaming.itch.io" target="_blank">​DillDogGaming - itch.io</a>
                    </p>
                </div>
            </section>

            <div className="ticks"></div>

            <section id="filters">
                <div>
                    <label>
                        Project Name:
                    </label>
                    <input
                        type="text"
                        value={filters.searchQuery}
                        onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
                        placeholder="Enter names to search for"
                    />
                </div>
                <div>
                    <label>
                        Large Scale
                    </label>
                    <input
                        type="checkbox"
                        checked={filters.is_large_scale}
                        onChange={(e) => setFilters(prev => ({ ...prev, is_large_scale: e.target.checked }))}
                    />
                </div>
                <div>
                    <label>
                        Major
                    </label>
                    <input
                        type="checkbox"
                        checked={filters.is_major}
                        onChange={(e) => setFilters(prev => ({ ...prev, is_major: e.target.checked }))}
                    />
                </div>
                <div>
                    <label>
                        Minor
                    </label>
                    <input
                        type="checkbox"
                        checked={filters.is_minor}
                        onChange={(e) => setFilters(prev => ({ ...prev, is_minor: e.target.checked }))}
                    />
                </div>
                <div>
                    <label>
                        Small Scale
                    </label>
                    <input
                        type="checkbox"
                        checked={filters.is_grouped}
                        onChange={(e) => setFilters(prev => ({ ...prev, is_grouped: e.target.checked }))}
                    />
                </div>
            </section>
            <section id="portfolio-items">
                {loading && <p>Loading portfolio items...</p>}
                {error && <p>Error loading portfolio items: {error}</p>}
                {!loading && !error && portItems.map(item => (
                    <div id="items">
                        <h2 id="itemName">{item.name}</h2>
                        {item.image_url && (
                            <img
                                src={item.image_url}
                                className="project-image"
                            />
                        )}
                        <p>{item.description}</p>
                        {item.url && (<a href={item.url} target="_blank">Project Url</a>)}
                    </div>
                ))}
                {portItems.length === 0 && basePortItems.length > 0 && !loading && !error && <h2 id="itemName">No portfolio items match the current filters.</h2>}
            </section>

            <div className="ticks"></div>
            <section id="spacer"></section>
        </>
    )
}

export default Portfolio
