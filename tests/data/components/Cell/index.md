### Cell Component

The Grid system of Adaline consists of two components: the `Grid` and the `Cell`. The `Cell` is the child component which belongs under a parent `Grid`.

`Cell` implements CSS Grid by using `grid-column` and `grid-row` to define the start and end of each child `Cell` within a `Grid`. These values can be individually defined for each breakpoint:

```
    const breakPoints = {
        xs: '599px',
        sm: '600px',
        md: '900px',
        lg: '1200px',
        xl: '1800px'
    };
```

Given this design, the `Cell` accepts the following props:

```
    Cell.PropTypes = {
        xs: PropTypes.arrayOf(PropTypes.number),
        sm: PropTypes.arrayOf(PropTypes.number),
        md: PropTypes.arrayOf(PropTypes.number),
        lg: PropTypes.arrayOf(PropTypes.number),
        xl: PropTypes.arrayOf(PropTypes.number),
    };
```

Which in practice looks like:

```
    <Grid
        xs={[1, 1]}
        sm={[6, 5]}
    >
        <Cell
            xs={[1, 3, 1, 2]}
            sm={[1, 4, 1, 2]}
        >
            <div style={{ backgroundColor: 'blue', height: '200px' }}></div>
        </Cell>

        // More Cells...
    </Grid>
```

What we are defining for each breakpoint is an array of **four numbers**: the first two are **column start / end**, the second two are **row start / end**.

Given this input, our blue div would sit as such within the `Grid`:

####sm
![sm](../../assets/sm_1.png 'Example 1')

Notice how the blue div occupies _half_ of the allotted columns within `sm`. In our `Grid`, we declared `sm={[6, 5]}` six columns and five roqws
