/**
 * Get the display prefix for a ligne (train line).
 * Lines A, B, C, D, E are RER lines, others are Transilien.
 */
export function getLignePrefixe(ligne: { nom?: string; prefixe?: string } | null): string {
    if (!ligne) return '';
    
    if (ligne.prefixe) {
        return ligne.prefixe;
    }
    
    if (ligne.nom) {
        const firstLetter = ligne.nom.charAt(0).toUpperCase();
        if (['A', 'B', 'C', 'D', 'E'].includes(firstLetter)) {
            return `RER ${firstLetter}`;
        }
        return `Transilien ${firstLetter}`;
    }
    
    return '';
}
