'use client';

export default function ListEditor({ items, onChange, fields, addLabel = 'Add item' }) {
  const update = (index, key, value) => {
    const next = items.slice();
    next[index] = { ...next[index], [key]: value };
    onChange(next);
  };

  const remove = (index) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const add = () => {
    const blank = {};
    fields.forEach((f) => {
      blank[f.key] = f.checkbox ? false : f.paragraphs ? [] : '';
    });
    onChange([...items, blank]);
  };

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, i) => (
        <div key={i} className="border border-rule p-4 relative">
          <button
            type="button"
            onClick={() => remove(i)}
            aria-label="Remove item"
            className="absolute top-2 right-2 text-soft hover:text-press text-sm"
          >
            Remove
          </button>
          <div className="grid sm:grid-cols-2 gap-3 pr-16">
            {fields.map((f) => (
              <label
                key={f.key}
                className={`flex ${f.checkbox ? 'flex-row items-center gap-2' : 'flex-col gap-1'} text-sm ${f.wide ? 'sm:col-span-2' : ''}`}
              >
                {f.checkbox ? (
                  <>
                    <input
                      type="checkbox"
                      checked={!!item[f.key]}
                      onChange={(e) => update(i, f.key, e.target.checked)}
                      className="border border-rule"
                    />
                    <span className="kicker text-soft">{f.label}</span>
                  </>
                ) : (
                  <>
                    <span className="kicker text-soft">{f.label}</span>
                    {f.paragraphs ? (
                      <textarea
                        value={(item[f.key] || []).join('\n\n')}
                        onChange={(e) =>
                          update(
                            i,
                            f.key,
                            e.target.value.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean)
                          )
                        }
                        rows={6}
                        placeholder="Separate paragraphs with a blank line"
                        className="border border-rule bg-paper px-3 py-2 font-serif text-ink focus:outline-none focus:border-ink"
                      />
                    ) : f.textarea ? (
                      <textarea
                        value={item[f.key] || ''}
                        onChange={(e) => update(i, f.key, e.target.value)}
                        rows={3}
                        className="border border-rule bg-paper px-3 py-2 font-serif text-ink focus:outline-none focus:border-ink"
                      />
                    ) : (
                      <input
                        type="text"
                        value={item[f.key] || ''}
                        onChange={(e) => update(i, f.key, e.target.value)}
                        className="border border-rule bg-paper px-3 py-2 font-serif text-ink focus:outline-none focus:border-ink"
                      />
                    )}
                  </>
                )}
              </label>
            ))}
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="self-start kicker text-press hover:underline"
      >
        + {addLabel}
      </button>
    </div>
  );
}
