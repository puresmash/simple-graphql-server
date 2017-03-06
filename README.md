
### How to start

```bash
npm run json-server
 
npm run dev
```

### Remark

For tolerate json-server, avoid using id array to prevent fetch all problem.

Remove accouting array in Travel, move the relationship to AccountingMap instead for temp.

For now, the following query is valid:

```
{
	travels(id:"0") {
	  id
    title
    accounting {
      id
      title
      amount
    }
	}
}
```
