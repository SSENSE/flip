### Grid Component

The Grid system of Adaline consists of two components: the `Grid` and the `Cell`. The `Grid` is the parent component which has `Cell` components as children.

`Grid` implements CSS Grid by using `grid-template-columns` and `grid-template-rows`. The component has been build to implement any arrangement of columns and rows across five breakpoints. These are used in our CSS media queries to create responsive layout over screen widths.

```
    const breakPoints = {
        xs: '599px',
        sm: '600px',
        md: '900px',
        lg: '1200px',
        xl: '1800px'
    };
```

Using the convention of existing [React Grid components](https://material-ui.com/layout/grid/), the `Grid` accepts the following props:

```
    Grid.PropTypes = {
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
        // Cells go here...
    </Grid>
```

Essentially, we are defining how many `columns` and `rows` we will have per breakpoint. We feed an array of two numbers for each desired breakpoint.

The first number defines `columns`, the second number defines `rows`.

```
    <Grid
        xs={[columns, rows]}
        sm={[columns, rows]}
    >
        // Cells go here...
    </Grid>
```

Given our first example, we define one column and one row for the `xs` breakpoint. If we were to inspect this Grid in the browser, we would see the following:

####sm
![sm](../../assets/sm_1.png 'Example 1')

Notice there are **six columns** and **five rows** within this `Grid` in `sm`.

If we move down to `xs`, we see **one column** and **five rows**.
This may seem strange as we defined `xs={[1, 1]}`, but this is by design. A `Grid` can have any number of `Cell` children, so by giving _one row_, we are simply allowing each child to be _its own row_, much the same as adding _n_ children divs to a parent div.

####xs
![xs](../../assets/xs_1.png 'Example 2')

### Defining breakpoints

Seeing the example above, one might ask about the breakpoints that were not declared in the `Grid` component: `md`, `lg` and `xl`. By design, `Grid` will auto-fill any missing breakpoints by scaling to the **next smallest breakpoint declared**.

For example, given this `Grid`, we have two breakpoints at the large end declared:

```
    <Grid
        lg={[2, 3]}
        xl={[5, 5]}
    >
    </Grid>
```

What will happen with `md`, `sm` and `xs` media queries is that they will read from the next smallest breakpoint declared, which is `lg`, and will adopt those values.

If we wanted something different at `xs` but nothing to change at `md` or `sm`, we would alter the `Grid` as such:

```
    <Grid
        xs={[1, 1]}
        sm={[2, 3]}
        xl={[5, 5]}
    >
    </Grid>
```

Now we have a specific layout for `xs`, and then we switch our `lg` declaration for an `sm`; this way, everything from `sm` until before the next breakpoint (`xl`) will follow that declaration, which takes care of `sm`, `md` and `lg` in this scenario.
