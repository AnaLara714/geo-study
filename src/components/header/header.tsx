'use client';

import Link from 'next/link';
import { useRef, useState } from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const API_URL = 'http://localhost:3001';

export function Header() {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [importando, setImportando] = useState(false);
    const [exportando, setExportando] = useState(false);

    const handleExport = async () => {
        try {
            setExportando(true);

            const response = await fetch(API_URL);

            if (!response.ok) {
                throw new Error('Erro ao buscar dados da API');
            }

            const data = await response.json();

            const json = JSON.stringify(data, null, 2);

            const blob = new Blob([json], {
                type: 'application/json',
            });

            const url = URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = 'db.json';

            document.body.appendChild(link);
            link.click();
            link.remove();

            URL.revokeObjectURL(url);
        } catch (error) {
            console.error(error);
            alert('Não foi possível exportar o JSON.');
        } finally {
            setExportando(false);
        }
    };

    const handleImportClick = () => {
        fileInputRef.current?.click();
    };

    const handleImport = async (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (!file) return;

        try {
            setImportando(true);

            const text = await file.text();
            const data = JSON.parse(text);

            if (typeof data !== 'object' || data === null) {
                throw new Error('JSON inválido');
            }

            for (const [resource, items] of Object.entries(data)) {
                if (!Array.isArray(items)) continue;

                for (const item of items) {
                    await fetch(`${API_URL}/${resource}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(item),
                    });
                }
            }

            alert('JSON importado com sucesso!');
        } catch (error) {
            console.error(error);
            alert('Não foi possível importar o JSON.');
        } finally {
            setImportando(false);

            event.target.value = '';
        }
    };

    return (
        <header className="w-full border-b bg-white">
            <div className="mx-auto flex h-16 items-center justify-around px-6 ml-0 mr-0">
                <div className='flex items-center gap-x-8'>
                    <Link
                        href="/"
                        className="text-xl font-bold text-gray-900"
                    >
                        GEO STUDY
                    </Link>

                    {/* <nav className="flex items-center gap-6">
                        <Link
                            href="/dashboard"
                            className="text-sm font-medium text-gray-600 hover:text-black"
                        >  
                            Opção 1
                        </Link>

                        <Link
                            href="/usuarios"
                            className="text-sm font-medium text-gray-600 hover:text-black"
                        >  Opção 2 
                        </Link>

                        <Link
                            href="/produtos"
                            className="text-sm font-medium text-gray-600 hover:text-black"
                        >
                             Opção 3 
                        </Link>

                        <Link
                            href="/produtos"
                            className="text-sm font-medium text-gray-600 hover:text-black"
                        >
                             Opção 4
                        </Link>

                        <Link
                            href="/produtos"
                            className="text-sm font-medium text-gray-600 hover:text-black"
                        >
                             Opção 5
                        </Link>

                        <Link
                            href="/produtos"
                            className="text-sm font-medium text-gray-600 hover:text-black"
                        >
                             Opção 6
                        </Link>
                    </nav> */}
                </div>
                {/* 
                <div className='flex flex-row items-center gap-x-2 '>
                    <div className="flex items-center gap-2">
                        <Button variant={'ghost'}>
                            Estilo do mapa
                        </Button>
                        <Input
                            ref={fileInputRef}
                            type="file"
                            accept=".json,application/json"
                            className="hidden hover:bg-gray-100 disabled:opacity-50"
                            onChange={handleImport}
                        />

                        <Button
                            type="button"
                            onClick={handleImportClick}
                            disabled={importando}
                            className="rounded-md border px-4 py-2 text-sm font-medium hover:bg-gray-400 disabled:opacity-50"
                        >
                            {importando ? 'Importando...' : 'Importar JSON'}
                        </Button>

                        <Button
                            type="button"
                            onClick={handleExport}
                            disabled={exportando}
                            className="rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
                        >
                            {exportando ? 'Exportando...' : 'Exportar JSON'}
                        </Button>
                    </div>
                    <Separator orientation='vertical' className='m-1' />
                    <Button variant={'secondary'}> Acompanhar atividade</Button>
                </div> */}
            </div>
        </header >
    );
}