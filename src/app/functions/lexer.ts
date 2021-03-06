// \s : matches any whitespace character (equal to [\r\n\t\f\v ])
//  + : match previous condition for one and unlimited times
export function lexer(code: any) {
    const tokensInput = code
                .replace(/[\n\r]/g, ' *nl* ')
                .replace(/\[/g, ' *ob* ')
                .replace(/\]/g, ' *cb* ')
                .replace(/\{/g, ' *ocb* ')
                .replace(/\}/g, ' *ccb* ')
                .split(/[\t\f\v ]+/);
    const tokens = [];
    for (const t of tokensInput) {
      if (t.length <= 0 || isNaN(t)) {
        if (t === '*nl*') {
          tokens.push({type: 'newline'});
        } else if (t === '*ob*') {
          tokens.push({type: 'ob'});
        } else if (t === '*cb*') {
          tokens.push({type: 'cb'});
        } else if (t === '*ocb*') {
          tokens.push({type: 'ocb'});
        } else if (t === '*ccb*') {
          tokens.push({type: 'ccb'});
        } else if (t.length > 0) {
          tokens.push({type: 'word', value: t});
        }
      } else {
        tokens.push({type: 'number', value: t});
      }
    }

    if (tokens.length < 1) {
      throw new Error('No Tokens Found. Try "Paper 10"');
    }

    return tokens;
}
