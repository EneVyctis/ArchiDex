import { inject, Service } from '@angular/core';
import { Archimonstre, ArchimonstreList } from './archimonstre.model';
import { ARCHIMONSTRE_LIST } from './archimonstre-list';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Service()
export class ArchimonstreService {
    private readonly ARCHIMONSTRE_API_URL = "http://localhost:3000/archimonstres";
    private readonly http = inject(HttpClient);

    getArchimonstreList(): Observable<ArchimonstreList> {
        return this.http.get<ArchimonstreList>(this.ARCHIMONSTRE_API_URL);
    }

    getArchimonstreByID(id: number): Observable<Archimonstre> {
        const url = this.ARCHIMONSTRE_API_URL +"/"+ id; 
        
        return this.http.get<Archimonstre>(url);
    }

    getArchimonstreResistanceList(): string[] {
        return [
            'feu',
            'terre',
            'eau',
            'air',
            'neutre',
        ];
    }

}
